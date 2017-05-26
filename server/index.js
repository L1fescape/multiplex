const path = require('path')
const express = require('express');
const http = require('http');
const url = require('url');
const SocketIO = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = SocketIO(server)

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080

const distRoot = './htdocs'

io.on('connection', function(socket) {
  socket.on('join', function(roomId) {
    socket.join(roomId)
  })
  socket.on('play', function(roomId) {
    console.log('play', roomId)
    io.sockets.in(roomId).emit('play')
  })
  socket.on('pause', function(roomId) {
    console.log('pause', roomId)
    io.sockets.in(roomId).emit('pause')
  })
  socket.on('leave', function(roomId) {
    socket.leave(roomId)
  })
});

app.use(express.static(distRoot))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, distRoot, 'index.html'))
})

server.listen(PORT, HOST, function listening() {
  console.log('Listening on %s:%d', server.address().address, server.address().port);
});
