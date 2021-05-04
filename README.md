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

### Setting up the frontend
1. Change to the frontend directory and create a new ".env" file with the following content:
```dotenv
VUE_APP_SOCKET_URL=http://localhost:3001
```
2. Point the VUE_APP_SOCKET_URL to your backend. By default, it is on localhost port 3001.
3. Run ```npm i```.
4. Run ```npm run build```.

### Running the frontend
The frontend is a static page located in the /dist folder in the frontend directory after running the npm run build command. There are multiple ways of serving a static webpage, like using NGINX.

1. To open the frontend, open the dist folder in the frontend directory and open the index.html file.

## Screenshots

![Screenshot Dashboard](https://i.ibb.co/W31BrfX/Screenshot-2021-05-04-at-20-21-08.png "Screenshot Dashboard")
![Screenshot Dashboard 2](https://i.ibb.co/4M6zN00/Screenshot-2021-05-04-at-20-21-28.png "Screenshot Dashboard 2")
![Screenshot Blocks](https://i.ibb.co/0YQQv5Y/Screenshot-2021-05-04-at-20-21-37.png "Screenshot Blocks")
![Screenshot Blocks 2](https://i.ibb.co/p0CV2N0/Screenshot-2021-05-04-at-20-21-44.png "Screenshot Blocks 2")
![Screenshot Block](https://i.ibb.co/M6YYK07/Screenshot-2021-05-04-at-20-22-11.png "Screenshot Block")
![Screenshot Block 2](https://i.ibb.co/ZgYV2f6/Screenshot-2021-05-04-at-20-22-20.png "Screenshot Block 2")
![Screenshot Transaction](https://i.ibb.co/JH474z4/Screenshot-2021-05-04-at-20-22-37.png "Screenshot Transaction")
![Screenshot Address](https://i.ibb.co/Vx9nzw3/Screenshot-2021-05-04-at-20-22-47.png "Screenshot Address")

## Future ideas
1. Show sent/received in address view.
2. Display additional data in coinbase transactions (decrypted OP_RETURN etc..).
3. Show realtime data when viewing address/transaction/block and give user feedback when the data updates (play sound on confirmation etc..). 
4. User configurable dashboard with various widgets. Like an account/address tracker widget.

## SUPPORT
For support, contact: mick@dutchbits.nl

