const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // Import bodyParser here

const urlencodedParser = bodyParser.urlencoded({ extended: false }); // Define urlencodedParser here

router.get('/', (req, res) => {
    res.render('insert');
  });
  

module.exports = router;
