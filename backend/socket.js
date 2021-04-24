const BitcoinClient = require('./services/BitcoinClient')
const bitcoinClient = new BitcoinClient()

function socketIo(io) {
  io.on('connection', (socket) => {
    console.log('Client connected.')

    socket.on('getBlockCount', () => { getBlockCount(socket) })
    socket.on('getLatestBlocks', () => { getLatestBlocks(socket) })
  })
}

async function getBlockCount(socket) {
  const blockCount = await bitcoinClient.getBlockCount()
  socket.emit('blockCount', blockCount)
}

async function getLatestBlocks(socket) {
  const latestBlocks = await bitcoinClient.getLatestBlocks()
  socket.emit('latestBlocks', latestBlocks)
}

module.exports = socketIo
