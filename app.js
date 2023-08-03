const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'CHAT1',
});
connection.connect();

// Import the route files
const indexRouter = require('./Routes/index'); // Update the path to routes/index.js
const usersRouter = require('./Routes/users'); // Update the path to routes/users.js
const insertRouter = require('./Routes/insert'); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(bodyParser.urlencoded({ extended: false }));

// Use the route files
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insert', insertRouter);





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

connection.end();