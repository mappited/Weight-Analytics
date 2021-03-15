let express = require("express");
let router = express.Router();
const { sessionService } = require("../services/session.service");

router.get("/", function(req, res, next) {
  console.log(req.params);
  res.send("respond with a resource");
});


/**
 * {"": ""}
 */
router.get("/:uuid", function(req, res, next) {
  console.log(req.params);
  console.log(req.cookies);
  res.cookie('test', 'value', {expire: 360000 + Date.now()})
  res.send("respond with a resource");
});

/**
 * {"": ""}
 */
router.post("/:uuid", function(req, res, next) {
  console.log(req.params);
  console.log(res.headers);
  res.send("respond with a resource");
});


module.exports = router;
