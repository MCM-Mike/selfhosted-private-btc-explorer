# Bitcoin Blockchain Explorer
## Backend

### Setting up the backend
1. Clone the project folder and open it.
2. Create a new file named ".env" in the backend folder and add the following contents:
```dotenv
WEB_SOCKET_PORT=3001

# bitcoind (with `txindex=1`) 
RPC_USER=
RPC_PASSWORD=
RPC_HOST=
RPC_PORT=8332

# ElectrumX
ELECTRUM_RPC_USER=
ELECTRUM_RPC_PASSWORD=
ELECTRUM_RPC_HOST=
ELECTRUM_RPC_PORT=50001

# do not change the settings below unless you know what you're doing
UPDATE_INTERVAL_MS=10000
MAX_BLOCK_RANGE=20
```
3. Change the .env variables to your own Bitcoind/Electrum config.
4. While in the backend folder, run the following command: ```npm i```.

### Running the backend
1. To run the backend, run the following command: ```npm run start```.

### Testing the backend
Backend tests are made using the Mocha testing framework.
1. To run the tests, while in the backend directory, run the command ```npm test```.
