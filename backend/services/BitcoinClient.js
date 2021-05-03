const axios = require('axios')
const ElectrumClient = require('./ElectrumClient')

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const HOST = process.env.RPC_HOST
const PORT = process.env.RPC_PORT

const URL = `http://${USER}:${PASS}@${HOST}:${PORT}/`

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
      this.cache.mempool = mempool
      this.cache.latestTransactions = latestTransactions

      callback()
    } catch (error) {
      console.log(error)
    } finally {
      // recursively update cache
      this.updateCache(callback)
    }
  }

  async getBlockCount() {
    return await this.postRpcCommand('getblockcount')
  }

  async getBlock(hash) {
    return await this.postRpcCommand('getblock', [hash])
  }

  async getBlockStats(hashOrIndex) {
    return await this.postRpcCommand('getblockstats', [hashOrIndex])
  }

  async getBlockHash(index) {
    index = parseInt(index)
    return await this.postRpcCommand('getblockhash', [index])
  }

  async getMempoolInfo() {
    return await this.postRpcCommand('getmempoolinfo')
  }

  async getRawMempool() {
    return await this.postRpcCommand('getrawmempool')
  }

  // get mempool transaction
  async getMempoolEntry(txHash) {
    return await this.postRpcCommand('getmempoolentry', [txHash])
  }

  async getTransaction(txid) {
    return await this.electrumClient.getTransaction(txid)
  }

  // get block range, indexes are both inclusive
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
    return this.getLatestBlocksOffset(0, 10)
  }

  async getLatestBlocksOffset(offset, numBlocks) {
    const latestBlock = await this.getBlockCount()

    if (latestBlock < 1) return

    const highestIndex = latestBlock - offset
    const lowestIndex = highestIndex - numBlocks+1

    const blocks = await this.getBlockRange(lowestIndex, highestIndex)

    return blocks.reverse()
  }

  // mempool optional
  async getLatestTransactions(mempool) {
    const MAX_TRANSACTIONS = 10
    let latestTransactions = []

    if (!mempool) mempool = await this.getRawMempool()

    for (let txHash of mempool) {
      let tx

      try {
        tx = await this.getTransactionAndInputs(txHash)
      } catch (error) {}

      if (!tx) continue

      latestTransactions.push(tx)

      if (latestTransactions.length === MAX_TRANSACTIONS) break
    }

    return latestTransactions
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
      balance: balance,
      history: history.map((tx) => tx.tx_hash)
    }
  }

  // params must be an array
  async postRpcCommand(method, params) {
    if (!params || !Array.isArray(params)) params = []
    const options = {
      url: URL,
      method: 'POST',
      headers: {'content-type': 'text/plain;'},
      data: {"jsonrpc":"1.0","id":"curltext","method":method,"params":params}
    }

    let data;

    try {
      const response = await axios(options)
      if (response.status !== 200) {
        throw new Error('Bitcoin node unreachable')
      }
      data = response.data.result
    } catch (error) {
      console.error(error)
    }

    return data
  }
}

module.exports = BitcoinClient
