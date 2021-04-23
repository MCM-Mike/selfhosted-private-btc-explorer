const axios = require('axios')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`
const headers = {'content-type': 'text/plain;'}

class BitcoinClient {
  async getBlockCount() {
    const dataString = '{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}'
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

  async getBlock(hash) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${hash}"]}`
    const options = {
      url: URL,
      method: 'POST',
      headers,
      data: dataString
    }

    let block;

    try {
      const response = await axios(options)
      checkStatus200(response)
      block = response.data.result
    } catch (error) {
      console.error(error)
    }

    return block
  }

  async getBlockRange(firstIndex, lastIndex) {
    const MAX_BLOCK_RANGE = process.env.MAX_BLOCK_RANGE || 10

    if (firstIndex > lastIndex) return
    if (firstIndex < 0) return
    if ((lastIndex - firstIndex) > MAX_BLOCK_RANGE) lastIndex = firstIndex + MAX_BLOCK_RANGE - 1

    let blocks = []

    for (let index = 0; index <= (lastIndex - firstIndex); index++) {
      const blockHash = await this.getBlockHash(firstIndex + index)
      const block = await this.getBlock(blockHash)

      blocks.push(block)
    }

    return blocks
  }

  async getBlockHash(index) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${index}]}`
    const options = {
      url: URL,
      method: 'POST',
      headers,
      data: dataString
    }

    let blockHash = '';

    try {
      const response = await axios(options)
      checkStatus200(response)
      blockHash = response.data.result
    } catch (error) {
      console.error(error)
    }

    return blockHash
  }

  async getMempoolInfo() {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmempoolinfo","params":[]}`
    const options = {
      url: URL,
      method: 'POST',
      headers,
      data: dataString
    }

    let mempoolInfo;

    try {
      const response = await axios(options)
      checkStatus200(response)
      mempoolInfo = response.data.result
    } catch (error) {
      console.error(error)
    }

    return mempoolInfo
  }
}

function checkStatus200(response) {
  if (response.status !== 200) {
    throw new Error('Bitcoin node unreachable')
  }
}

module.exports = BitcoinClient
