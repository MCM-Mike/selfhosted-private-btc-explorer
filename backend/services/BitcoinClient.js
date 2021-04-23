const axios = require('axios')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`

class BitcoinClient {
  async getBlockCount() {
    const dataString = '{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}'
    const headers = {'content-type': 'text/plain;'}
    const options = {
      url: URL,
      method: 'POST',
      headers,
      data: dataString
    }

    let blockCount = 0;

    try {
      const response = await axios(options)
      checkStatus200(response)
      blockCount = response.data.result
    } catch (error) {
      console.error(error)
    }

    return blockCount
  }
}

function checkStatus200(response) {
  if (response.status !== 200) {
    throw new Error('Bitcoin node unreachable')
  }
}

module.exports = BitcoinClient
