# Bitcoin Blockchain Explorer
## Frontend 


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


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
