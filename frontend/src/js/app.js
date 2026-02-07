var web3;
var contractInstance;

// IMPORTANT: Update this address after every 'truffle migrate'
var agentContractAddress = "0x3c01a8a2D02459f79b5e99E0c2449c2F6F7B730F"; 

async function connect() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it.");
    return;
  }

  try {
    // 1. Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });
    
    // 2. Initialize Web3
    web3 = new Web3(window.ethereum);

    // FULL ABI including get_doctor, insurance_claimm, etc.
    var abi = [
      {
        "inputs": [
          { "internalType": "string", "name": "_name", "type": "string" },
          { "internalType": "uint256", "name": "_age", "type": "uint256" },
          { "internalType": "uint256", "name": "_designation", "type": "uint256" },
          { "internalType": "string", "name": "_hash", "type": "string" }
        ],
        "name": "add_agent",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
        "name": "get_patient",
        "outputs": [
          { "internalType": "string", "name": "", "type": "string" },
          { "internalType": "uint256", "name": "", "type": "uint256" },
          { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
          { "internalType": "address", "name": "", "type": "address" },
          { "internalType": "string", "name": "", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
        "name": "get_doctor",
        "outputs": [
          { "internalType": "string", "name": "", "type": "string" },
          { "internalType": "uint256", "name": "", "type": "uint256" },
          { "internalType": "string", "name": "", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "get_patient_list",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "get_doctor_list",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
        "name": "get_accessed_patientlist_for_doctor",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
        "name": "get_accessed_doctorlist_for_patient",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "paddr", "type": "address" }],
        "name": "get_hash",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "paddr", "type": "address" },
          { "internalType": "uint256", "name": "_diagnosis", "type": "uint256" },
          { "internalType": "string", "name": "_hash", "type": "string" }
        ],
        "name": "insurance_claimm",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
        "name": "permit_access",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "daddr", "type": "address" }],
        "name": "revoke_access",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "paddr", "type": "address" },
          { "internalType": "string", "name": "_hash", "type": "string" }
        ],
        "name": "set_hash_public",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    // 3. Modern Contract Instantiation
    contractInstance = new web3.eth.Contract(abi, agentContractAddress);

    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    
    console.log("Web3 Connected. Current Account:", accounts[0]);

  } catch (error) {
    console.error("User denied account access or error occurred", error);
  }
}

window.addEventListener("load", connect);