const PORT = process.env.SOCKET_URL | 3001
const io = require('socket.io')(PORT, {
  cors: {
    // No CORS at all
    origin: '*'
  }
})

require('./socket')(io)

/*
// Since we are a serverMiddleware, we have to return a handler, even if this it does nothing
export default function (req, res, next) {
  next()
}
*/
