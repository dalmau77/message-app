const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('new websocket')

  socket.broadcast.emit('message', 'a new user has joined')
  socket.emit('message', 'greeting')

  socket.on('sendMessage', (data) => {

    io.emit('incomingMessage', data)
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', 'a user has left')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));
