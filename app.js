const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io')
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // notification to all the user who is connected/disconnected
    // io.emit('init','Welcome to the application !');
    
    // simple emit which will display the same msg to the user who sends it
    // socket.on('chat message', (message) => {
    //     console.log(message)
    //     io.emit('chat message' , message);
    //   });

    //Don’t send the same message to the user that sent it. Instead, append the message directly as soon as they press enter using socket.io
    socket.on('chat message', (message) => {
        console.log(message)
        socket.broadcast.emit('chat message' , message);
      });

    socket.on('disconnect',() => {
        io.emit('disconnection','user disconnected')
    })

    socket.on('typing', (message) => {
        socket.broadcast.emit('typing', message)
    })
});
  

const port = 3000;
server.listen(port,() => {
    console.log(`Server running on port ${port}`);
})