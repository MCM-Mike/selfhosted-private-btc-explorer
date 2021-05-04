# Bitcoin Blockchain Explorer
Frontend is done with Vue, while the backend is built on Node.js. Communication between Frontend and Backend goes via sockets (Socket.IO). Thus the data displayed on the frontend is (very close to) real-time.

## Installation

### Prerequisites
1. Setup and run your own Bitcoind node.
2. Setup and run your own Electrum(X) node and connect it to your Bitcoind node.

### Setting up the backend
1. Clone the project folder and open it.
2. Create a new file named ".env" in the backend folder and add the following contents:
```dotenv
WEB_SOCKET_PORT=3001

RPC_USER=
RPC_PASSWORD=
RPC_HOST=
RPC_PORT=8332

ELECTRUM_RPC_USER=
ELECTRUM_RPC_PASSWORD=
ELECTRUM_RPC_HOST=
ELECTRUM_RPC_PORT=50001
```
3. Change the .env variables to your own Bitcoind/Electrum config.
4. While in the backend folder, run the following command: ```npm run build```.

### Running the backend
1. To run the backend, run the following command: ```npm run start```.

### Setting up the frontend
1. Change to the frontend directory and create a new ".env" file with the following content:
```dotenv
VUE_APP_SOCKET_URL=http://localhost:3001
```
2. Point the VUE_APP_SOCKET_URL to your backend. By default, it is on localhost port 3001.
3. Run ```npm run build```.

### Testing the backend
Backend tests are made using the Mocha testing framework.
1. To run the tests, while in the backend directory, run the command ```npm test```.

### Running the frontend
The frontend is a static page located in the /dist folder in the frontend directory after running the npm run build command. There are multiple ways of serving a static webpage, like using NGINX.

1. To open the frontend, open the dist folder in the frontend directory and open the index.html file.

## Screenshots

Pre-final version

## Future ideas
1. Show sent/received in address view.
2. Display additional data in coinbase transactions (decrypted OP_RETURN etc..).
3. Show realtime data when viewing address/transaction/block and give user feedback when the data updates (play sound on confirmation etc..). 
4. User configurable dashboard with various widgets. Like an account/address tracker widget.

## SUPPORT
For support, contact: mick@dutchbits.nl

