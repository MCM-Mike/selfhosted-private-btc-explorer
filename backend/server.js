require('dotenv').config()
const PORT = process.env.PORT | 3001
const io = require('socket.io')(PORT, {
  cors: {
    // No CORS at all
    origin: '*'
  }
})

require('./test/Test_BitcoinClient')
require('./socket')(io)

console.log(`Running on port: ${PORT}`)

/*
// Since we are a serverMiddleware, we have to return a handler, even if this it does nothing
export default function (req, res, next) {
  next()
}
*/
