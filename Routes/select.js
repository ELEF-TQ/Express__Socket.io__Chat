const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const url = require('url');

router.get('/', (req, res) => {
  const queryData = url.parse(req.url, true).query;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CHAT1',
  });

  connection.connect();

  const userId = queryData.id; 

  connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, result, fields) {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render('select', { data: result });
    }
    connection.end(); 
  });
});

module.exports = router;
