# ArogyaBlock – Local Setup Guide
Blockchain + IPFS + AI based healthcare system.
---

## Prerequisites
- Node.js **16+**
- Python **3.11**
- IPFS (CLI)
- Ganache
- MetaMask
- npm, git
---

## 1. IPFS Setup

Install IPFS:
https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions

```bash
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT","POST","GET"]'
ipfs daemon
````

IPFS API: `http://127.0.0.1:5001`
Gateway: `http://127.0.0.1:8080/ipfs/<hash>`

---

## 2. Ganache

Install:
[https://truffleframework.com/ganache](https://truffleframework.com/ganache)

* Start Ganache
* RPC: `http://127.0.0.1:7545`
* Chain ID: `1337`

---

## 3. MetaMask

Install:
[https://metamask.io/](https://metamask.io/)

Add Network:

* RPC URL: `http://127.0.0.1:7545`
* Chain ID: `1337`
* Symbol: `ETH`

Import an account using a private key from Ganache.
---

## 4. Frontend + Smart Contracts

```bash
cd frontend
npm install
npm install -g truffle
truffle compile
truffle migrate
# or fresh deploy
truffle migrate --reset
npm start```


## 5. Backend (AI Service)

```bash
cd ..
cd backend
uv venv python 3.11
uv init
uv add -r requirements.txt
python app.py
```

Backend runs on: `http://127.0.0.1:8000`

Optional (train model):

```bash
python main.py
```



---

## Done ✅

* Smart Contracts → Ganache
* Medical Records → IPFS
* AI → Python Backend
* UI → Frontend

---