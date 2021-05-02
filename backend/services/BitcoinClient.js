const axios = require('axios')
const ElectrumClient = require('./ElectrumClient')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`
const headers = {'content-type': 'text/plain;'}

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
    try {
      const blockCount = await this.getBlockCount()
      const latestBlocks = await this.getLatestBlocks()
      const mempool = await this.getRawMempool()
      const latestTransactions = await this.getLatestTransactions(mempool)

      this.cache.blockCount = blockCount
      this.cache.latestBlocks = latestBlocks
      this.cache.latestTransactions = latestTransactions
      this.cache.mempool = mempool

      callback()
    } catch (error) {
      console.log(error)
    } finally {
      // recursively update cache
      this.updateCache(callback)
    }
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
    return await this.rpcCall(dataString)
  }

  async getBlock(hash) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${hash}"]}`
    let block = await this.rpcCall(dataString)
    block.coinbasetx = await this.getRawTransaction(block.tx[0], block.hash)
    return block
  }

  async getBlockStats(hashOrIndex) {
    let dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockstats","params":["${hashOrIndex}"]}`
    if (isNumber(hashOrIndex)) dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockstats","params":[${hashOrIndex}]}`
    return await this.rpcCall(dataString)
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
    index = parseInt(index)
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${index}]}`
    return await this.rpcCall(dataString)
  }

  async getMempoolInfo() {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmempoolinfo","params":[]}`
    return await this.rpcCall(dataString)
  }

  async getRawMempool() {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawmempool","params":[]}`
    return await this.rpcCall(dataString)
  }

  // get mempool transaction
  async getMempoolEntry(txHash) {
    const dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmempoolentry","params":["${txHash}"]}`
    return await this.rpcCall(dataString)
  }

  async getRawTransaction(txid, blockHash) {
    let dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${txid}"]}`
    if (blockHash) dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${txid}", 1, "${blockHash}"]}`
    return await this.rpcCall(dataString)
  }

  async getTransaction(txid) {
    return await this.electrumClient.getTransaction(txid)
  }

  async getTransactionAndInputs(txid) {
    let tx = await this.getTransaction(txid)

    if (!tx) return undefined

    for (let index = 0; index < tx.vin.length; index++) {
      if (tx.vin[index].coinbase || !tx.vin[index].txid) continue
      // get input transaction so that we can calculate the value in the frontend
      tx.vin[index].tx = await this.getTransaction(tx.vin[index].txid)
    }

    return tx
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

  async rpcCall(dataString) {
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
}

function checkStatus200(response) {
  if (response.status !== 200) {
    throw new Error('Bitcoin node unreachable')
  }
}

function isNumber(string) {
  return !isNaN(string)
}

module.exports = BitcoinClient
