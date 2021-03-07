const express = require('express');
// const db = require("../app_modules/firebase");
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({name: "TEST"});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
