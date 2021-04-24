const BitcoinClient = require('./services/BitcoinClient')
const bitcoinClient = new BitcoinClient()

function socketIo(io) {
  io.on('connection', (socket) => {
    console.log('Client connected.')

    socket.on('getBlockCount', () => { getBlockCount(socket) })
    socket.on('getLatestBlocks', () => { getLatestBlocks(socket) })
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

bitcoinClient.updateCache()

module.exports = socketIo
