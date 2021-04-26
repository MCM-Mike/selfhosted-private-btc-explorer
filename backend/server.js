require('dotenv').config()
const PORT = process.env.WEB_SOCKET_PORT | 3001
const io = require('socket.io')(PORT, {
  cors: {
    // No CORS at all
    origin: '*'
  }
})

require('./socket')(io)

console.log(`Running on port: ${PORT}`)
