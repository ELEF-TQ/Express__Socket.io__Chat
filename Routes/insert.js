const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/' ,(req, res) => {
   res.render('insert')
});
router.post('/', urlencodedParser, (req, res) => {
  const { name, email, image } = req.body; 
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CHAT1',
  });

  connection.connect();

  const sql = 'INSERT INTO `users` (`name`, `email`, `image`) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, image], function (error, result, fields) {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data into the database');
    } else {
      res.redirect('/'); 
    }
    connection.end(); 
  });
});

module.exports = router;
