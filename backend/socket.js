const BitcoinClient = require('./services/BitcoinClient')
const bitcoinClient = new BitcoinClient()

function socketIo(io) {
  io.on('connection', (socket) => {
    console.log('Client connected.')

    socket.on('getBlockCount', () => { getBlockCount(socket) })
    socket.on('getLatestBlocks', () => { getLatestBlocks(socket) })
    socket.on('getBlock', (hashOrIndex) => { getBlock(socket, hashOrIndex) })
    socket.on('getTransaction', (hash) => { getTransaction(socket, hash) })
    socket.on('getBlockOrTransaction', (hashOrIndex) => { getBlock(socket, hashOrIndex) })
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

async function getTransaction(socket, hash) {
  const transaction = await bitcoinClient.getTransaction(hash)
  socket.emit('transaction', transaction)
}

// can't recognize a block hash from a tx hash
async function getBlockOrTransaction(hashOrIndex) {
  let block;
  let transaction;

  if (isSha256(hashOrIndex)) {
    if (isLikelyBlockHash(hashOrIndex)) block = await bitcoinClient.getBlock(hashOrIndex)
    //if (!block) transaction = await bitcoinClient.getTransaction(hashOrIndex)
  } else if (isNumber(hashOrIndex)) {
    const blockHash = await bitcoinClient.getBlockHash(hashOrIndex)
    block = await bitcoinClient.getBlock(blockHash)
  }

  return { block, transaction }
}

function isSha256(string) {
  return string.matches("^[a-fA-F0-9]{64}$")
}

function isNumber(string) {
  return !isNaN(string)
}

function isLikelyBlockHash(hash) {
  return hash.substring(0, 4) === '0000'
}

bitcoinClient.updateCache()

module.exports = socketIo
