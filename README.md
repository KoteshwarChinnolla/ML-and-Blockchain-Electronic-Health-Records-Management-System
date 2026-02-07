# Steps

1. IPFS
   https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions

   ipfs init

   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"

   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"

   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[\"PUT\", \"POST\", \"GET\"]"

2. Ganache
   https://truffleframework.com/ganache
3. Metamask
   https://metamask.io/
4. Npm
   npm install
  
   npm install truffle -g

   truffle compile

   truffle migrate

   truffle migrate --reset

   npm start