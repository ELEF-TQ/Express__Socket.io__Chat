const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(bodyParser.urlencoded({ extended: false }));



// Import the route files
const indexRouter = require('./Routes/index'); 
const usersRouter = require('./Routes/users'); 
const insertRouter = require('./Routes/insert'); 
const selectRouter = require('./Routes/select');


// Use the route files
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insert', insertRouter);
app.use('/select', selectRouter);






io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (user, msg) => {
    io.emit('server message', user, msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

