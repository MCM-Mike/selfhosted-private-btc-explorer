const axios = require('axios')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`
const headers = {'content-type': 'text/plain;'}

// default to 30 seconds
const UPDATE_CACHE_INTERVAL_MILLISECONDS = process.env.UPDATE_CACHE_INTERVAL_MILLISECONDS || 30000
const MAX_BLOCK_RANGE = process.env.MAX_BLOCK_RANGE || 10

class BitcoinClient {
  cache = {
    blockCount: 0, // block count of the node
    latestBlocks: [] // 10 latest blocks
  }

  async updateCache() {
    const blockCount = await this.getBlockCount()
    const latestBlocks = await this.getLatestBlocks()

    this.cache.blockCount = blockCount
    this.cache.latestBlocks = latestBlocks

    console.log('Updated cache.')

    this.updateCache()
  }

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
    if (firstIndex > lastIndex) return
    if (firstIndex < 0) return
    if ((lastIndex - firstIndex) > MAX_BLOCK_RANGE) lastIndex = firstIndex + MAX_BLOCK_RANGE - 1

    let blocks = []

    for (let index = 0; index <= (lastIndex - firstIndex); index++) {
      const blockHash = await this.getBlockHash(firstIndex + index)
      if (!blockHash) break

      const block = await this.getBlock(blockHash)
      if (!block) break

      blocks.push(block)
    }

    return blocks
  }

  // returns 10 latest blocks on the node
  async getLatestBlocks() {
    const blockCount = await this.getBlockCount()

    if (blockCount < 1) return

    let firstIndex = blockCount - 9
    const lastIndex = blockCount

    if (firstIndex < 0) firstIndex = 0

    const latestBlocks = await this.getBlockRange(firstIndex, lastIndex)

    return latestBlocks.reverse()
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
