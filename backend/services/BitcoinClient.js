const axios = require('axios')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`

class BitcoinClient {
  getBlockCount() {
    return new Promise((resolve, reject) => {
      const dataString = '{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}'
      const headers = { 'content-type': 'text/plain;' }
      const options = {
        url: URL,
        method: 'POST',
        headers,
        data: dataString
      }

      axios(options)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(new Error('Error during getblockcount.'))
          }
        })
    })
  }
}

module.exports = BitcoinClient
