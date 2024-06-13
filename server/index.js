const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { addUser } = require('./users');

const router = require('./route');

const app = express();
app.use(cors({origin: '*'}));
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', ({username, room}) => {
    console.log('Join: ', username, room);
    socket.join(room);
    const user = addUser({user: {name: username}, room});
    socket.emit('message', 
    { data: { 
      user: {
        username: username
      }, 
      text: `Welcome, your room is ${room}` 
    } });
    socket.broadcast.emit('message', { data: { user: { username: user.user.name }, text: 'A new user has joined' } });
  });


  socket.on('message', (message) => {
    console.log('Message: ', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5001, () => {
  console.log('Server is running on port 5001');
});
