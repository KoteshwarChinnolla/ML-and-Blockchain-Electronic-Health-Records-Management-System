from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle
import uvicorn

app = FastAPI(title="Disease Prediction API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Model & Data (Global) ---
try:
    print("Loading models and data...")
    rf_clf = pickle.load(open("model2.pkl", "rb"))

    # Load CSVs
    df_train = pd.read_csv("data/clean/Training.csv")
    df_desc = pd.read_csv("data/clean/description778.csv")
    df_prec = pd.read_csv("data/clean/precaution998.csv")
    
    # Optional: Load medicines/diet if available
    try:
        df_diet = pd.read_csv("data/clean/medicines_list.csv")
        df_diet["Disease"] = df_diet["Disease"].str.lower().str.strip()
    except:
        df_diet = pd.DataFrame()

    # Clean Data
    df_desc["Disease"] = df_desc["Disease"].str.lower().str.strip()
    df_prec["Disease"] = df_prec["Disease"].str.lower().str.strip()

    # 1. Create Symptom Index (Column names from training data)
    # Exclude the last column ('prognosis')
    feature_columns = df_train.columns[:-1]
    symptom_index = {symptom: i for i, symptom in enumerate(feature_columns)}

    # 2. Create Disease Metadata Lookup (O(1) access)
    disease_metadata = {}
    all_diseases = sorted(df_desc["Disease"].unique()) # Sorted for consistent ID mapping

    for disease in all_diseases:
        desc_row = df_desc[df_desc["Disease"] == disease]
        desc = desc_row["Description"].values[0] if not desc_row.empty else "No description available."
        
        prec_row = df_prec[df_prec["Disease"] == disease]
        precs = []
        if not prec_row.empty:
            p = prec_row.iloc[0]
            # Collect valid precautions
            precs = [str(val) for val in p.values[1:] if pd.notna(val)]

        diet = "Balanced diet recommended."
        if not df_diet.empty:
            diet_row = df_diet[df_diet["Disease"] == disease]
            if not diet_row.empty and 'Diet' in diet_row.columns:
                 diet = diet_row['Diet'].values[0]

        disease_metadata[disease] = {
            "description": desc,
            "precautions": precs,
            "diet": diet
        }

except Exception as e:
    print(f"CRITICAL ERROR LOADING DATA: {e}")
    # Initialize empties to prevent crash, but API will fail on logic
    rf_clf = None
    symptom_index = {}
    disease_metadata = {}
    all_diseases = []


# --- Pydantic Models ---
class SymptomRequest(BaseModel):
    symptoms: list[str]


# --- Endpoints ---

@app.get("/")
def home():
    return {"message": "ArogyaBlock AI API is running"}

@app.get("/get_symptoms")
def get_symptoms():
    """Returns sorted list of all valid symptoms for dropdowns."""
    return {"symptoms": sorted(list(symptom_index.keys()))}

@app.get("/get_diseases")
def get_diseases():
    """Returns sorted list of diseases to map IDs."""
    return {"diseases": all_diseases}

@app.post("/predict")
def predict_disease(request: SymptomRequest):
    """
    Input: { "symptoms": ["itching", "skin_rash"] }
    Output: Disease, Probability, Precautions, Diet
    """
    user_symptoms = request.symptoms
    
    # Create input vector
    input_vector = np.zeros(len(symptom_index))
    matched_symptoms = []

    for sym in user_symptoms:
        # Normalize string: "Skin Rash" -> "skin_rash" (adjust based on your CSV format)
        clean_sym = sym.strip().lower().replace(" ", "_")
        
        if clean_sym in symptom_index:
            input_vector[symptom_index[clean_sym]] = 1
            matched_symptoms.append(clean_sym)
    
    if not matched_symptoms:
        # If no symptoms match, return 400 or a default
        raise HTTPException(status_code=400, detail="No valid symptoms found in database.")

    # Predict
    prediction = rf_clf.predict([input_vector])[0]
    prediction_clean = prediction.lower().strip()

    # Get Metadata
    info = disease_metadata.get(prediction_clean, {
        "description": "Information not available.",
        "precautions": [],
        "diet": ""
    })

    # Get Probability (Confidence)
    probability = 0.0
    if hasattr(rf_clf, "predict_proba"):
        prob_array = rf_clf.predict_proba([input_vector])
        probability = float(np.max(prob_array))

    return {
        "predicted_disease": prediction,
        "predicted_probability": probability,
        "matched_symptoms": matched_symptoms,
        "description": info["description"],
        "precautions": info["precautions"],
        "diet": info["diet"]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)