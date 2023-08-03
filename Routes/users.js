const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // Import bodyParser here

const urlencodedParser = bodyParser.urlencoded({ extended: false }); // Define urlencodedParser here

router.get('/', (req, res) => {
  res.render('users');
});

router.post('/', urlencodedParser, (req, res) => {
  res.render('users', { userData: req.body });
});

module.exports = router;
