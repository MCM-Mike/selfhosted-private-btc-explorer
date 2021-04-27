const axios = require('axios')
const ElectrumClient = require('./ElectrumClient')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`
const headers = {'content-type': 'text/plain;'}

// default to 30 seconds
const UPDATE_CACHE_INTERVAL_MILLISECONDS = process.env.UPDATE_CACHE_INTERVAL_MILLISECONDS || 30000
const MAX_BLOCK_RANGE = process.env.MAX_BLOCK_RANGE || 20

class BitcoinClient {
  electrumClient
  cache = {
    blockCount: 0, // block count of the node
    latestBlocks: [], // 10 latest blocks
    latestTransactions: [],
    mempool: []
  }

  constructor() {
    this.electrumClient = new ElectrumClient()
    this.electrumClient.connect()
  }

  async updateCache(callback) {
    const blockCount = await this.getBlockCount()
    const latestBlocks = await this.getLatestBlocks()
    const mempool = await this.getRawMempool()
    const latestTransactions = await this.getLatestTransactions(mempool)

    this.cache.blockCount = blockCount
    this.cache.latestBlocks = latestBlocks
    this.cache.latestTransactions = latestTransactions
    this.cache.mempool = mempool

    callback()

    // recursively update cache
    this.updateCache(callback)
  }

  // mempool optional
  async getLatestTransactions(mempool) {
    let latestTransactions = []

    if (!mempool) mempool = await this.getRawMempool()

    mempool = mempool.slice(0, 10)

    for (let txHash of mempool) {
      let tx = await this.electrumClient.getTransaction(txHash)
      tx.info = await this.getMempoolEntry(txHash)
      latestTransactions.push(tx)
    }

    return latestTransactions
  }

  async getBlockCount() {
    const dataString = '{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}'
    return await rpcCall(dataString)
  }

  async getBlock(hash) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${hash}"]}`
    let block = await rpcCall(dataString)
    block.coinbasetx = await this.getRawTransaction(block.tx[0], block.hash)
    return block
  }

  async getBlockStats(hashOrIndex) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockstats","params":["${hashOrIndex}"]}`
    return await rpcCall(dataString)
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

  // returns amount of blocks by an offset
  async getLatestBlocksOffset(offset, numBlocks) {
    const latestBlock = await this.getBlockCount()

    if (latestBlock < 1) return

    const highestIndex = latestBlock - offset+1
    const lowestIndex = highestIndex - numBlocks-1

    const blocks = await this.getBlockRange(lowestIndex, highestIndex)

    return blocks.reverse()
  }

  async getBlockHash(index) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${index}]}`
    return await rpcCall(dataString)
  }

  async getMempoolInfo() {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmempoolinfo","params":[]}`
    return await rpcCall(dataString)
  }

  async getRawMempool() {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawmempool","params":[]}`
    return await rpcCall(dataString)
  }

  // get mempool transaction
  async getMempoolEntry(txHash) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmempoolentry","params":["${txHash}"]}`
    return await rpcCall(dataString)
  }

  async getRawTransaction(txid, blockHash) {
    let dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${txid}"]}`
    if (blockHash) dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${txid}", 1, "${blockHash}"]}`
    return await rpcCall(dataString)
  }

  async getTransaction(txid) {
    return await this.electrumClient.getTransaction(txid)
  }

  async getAddressInfo(address) {
    const balance = await this.electrumClient.getBalance(address)
    const history = await this.electrumClient.getHistory(address)

    return {
      address: address,
      balance: balance.confirmed,
      history: history.map((tx) => tx.tx_hash)
    }
  }
}

async function rpcCall(dataString) {
  const options = {
    url: URL,
    method: 'POST',
    headers,
    data: dataString
  }

  let data;

  try {
    const response = await axios(options)
    checkStatus200(response)
    data = response.data.result
  } catch (error) {
    console.error(error)
  }

  return data
}

function checkStatus200(response) {
  if (response.status !== 200) {
    throw new Error('Bitcoin node unreachable')
  }
}

module.exports = BitcoinClient
