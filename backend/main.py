import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier


try:
    df_train = pd.read_csv("data/clean/Training.csv")
    print("Training data loaded successfully.")
except FileNotFoundError:
    print("Error: Could not find 'data/clean/Training.csv'. Please check the path.")
    exit()


X = df_train.iloc[:, :-1]
y = df_train.iloc[:, -1]


clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)
print("Model trained successfully.")


with open("model2.pkl", "wb") as f:
    pickle.dump(clf, f)
print("Model saved as 'model2.pkl'.")