const express = require("express");
const router = express.Router();


/* GET home page of the WCS */
router.get("/", function(req, res, next) {
  res.render("index.html");
  // res.render("index", { title: "Express" });
});

// 
router.get("/data", function(req, res, next) {
  res.json([
    {date: "2021-03-13", mass: 75.3},
    {date: "2021-03-14", mass: 74.9},
    {date: "2021-03-15", mass: 75.1},
    {date: "2021-03-16", mass: 75.9},
    {date: "2021-03-17", mass: 76.0},
    {date: "2021-03-18", mass: 75.1},
  ])
});

router.post("")

module.exports = router;
