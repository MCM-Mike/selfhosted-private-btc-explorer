const BitcoinClient = require('./services/BitcoinClient')
const bitcoinClient = new BitcoinClient()

function socketIo(io) {
  io.on('connection', (socket) => {
    console.log('Client connected.')
    socket.on('getBlockCount', () => { getBlockCount(socket) })
    socket.on('getLatestBlocks', () => { getLatestBlocks(socket) })
    socket.on('getLatestBlocksOffset', (offset) => { getLatestBlocksOffset(socket, offset) })
    socket.on('getBlock', (hashOrIndex) => { getBlock(socket, hashOrIndex) })
    socket.on('getBlockStats', (hashOrIndex) => { getBlockStats(socket, hashOrIndex) })
    socket.on('getTransaction', (hash) => { getTransactionInputs(socket, hash) })
    socket.on('getBlockOrTransaction', (hashOrIndex) => { getBlockOrTransaction(socket, hashOrIndex) })
    socket.on('getLatestTransactions', () => { getLatestTransactions(socket) })
    socket.on('getAddressInfo', (address) => { getAddressInfo(socket, address) })
  })

  bitcoinClient.updateCache(function () {
    getBlockCount(io)
    getLatestBlocks(io)
    getLatestTransactions(io)
  })
}

function getBlockCount(socket) {
  const blockCount = bitcoinClient.cache.blockCount
  socket.emit('blockCount', blockCount)
}

function getLatestBlocks(socket) {
  const latestBlocks = bitcoinClient.cache.latestBlocks
  socket.emit('latestBlocks', latestBlocks)
}

async function getLatestBlocksOffset(socket, offset) {
  const latestBlocks = await bitcoinClient.getLatestBlocksOffset(offset, 20);
  socket.emit('latestBlocksOffset', latestBlocks)
}

async function getBlock(socket, hashOrIndex) {
  let block;

  if (isSha256(hashOrIndex)) {
    block = await bitcoinClient.getBlock(hashOrIndex)
  } else if (isNumber(hashOrIndex)) {
    const blockHash = await bitcoinClient.getBlockHash(hashOrIndex)
    block = await bitcoinClient.getBlock(blockHash)
  }
  socket.emit('block', block)
}

async function getBlockStats(socket, hashOrIndex) {
  let blockStats;

  blockStats = await bitcoinClient.getBlockStats(hashOrIndex)

  socket.emit('blockStats', blockStats)
}

async function getTransaction(socket, hash) {
  const transaction = await bitcoinClient.getTransaction(hash)
  socket.emit('transaction', transaction)
}

async function getTransactionInputs(socket, hash) {
  const transaction = await bitcoinClient.getTransactionAndInputs(hash)
  socket.emit('transaction', transaction)
}

// can't recognize a block hash from a tx hash
async function getBlockOrTransaction(socket, hashOrIndex) {
  let block;
  let tx;

  if (isNumber(hashOrIndex)) {
    const blockHash = await bitcoinClient.getBlockHash(hashOrIndex)
    block = await bitcoinClient.getBlock(blockHash)
  } else if (isSha256(hashOrIndex)) {
    if (isLikelyBlockHash(hashOrIndex)) block = await bitcoinClient.getBlock(hashOrIndex)
    if (!block) tx = await bitcoinClient.getTransaction(hashOrIndex)
  }

  socket.emit('blockOrTransaction', { block, tx })
}

async function getLatestTransactions(socket) {
  const latestTransactions = bitcoinClient.cache.latestTransactions
  socket.emit('latestTransactions', latestTransactions)
}

async function getAddressInfo(socket, address) {
  const info = await bitcoinClient.getAddressInfo(address)
  socket.emit('addressInfo', info)
}

function isSha256(string) {
  return /^[a-fA-F0-9]{64}$/.test(string)
}

function isNumber(string) {
  return !isNaN(string)
}

function isLikelyBlockHash(hash) {
  return hash.substring(0, 4) === '0000'
}

module.exports = socketIo
