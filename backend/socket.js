const BitcoinClient = require('./services/BitcoinClient')
const bitcoinClient = new BitcoinClient()

function socketIo(io) {
  io.on('connection', (socket) => {
    console.log('Client connected.')

    socket.on('disconnect', function () {})

    socket.on('getBlockCount', function () {
      bitcoinClient.getBlockCount()
        .then((result) => {
          socket.emit('blockCount', result)
        })
    })
  })
}

module.exports = socketIo
