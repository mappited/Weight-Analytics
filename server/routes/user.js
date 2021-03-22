let express = require("express");
let router = express.Router();;
const { HTTPError } = require("../app_modules/exception");
const { userService } = require("../services/user.service");

/**
 * {"": ""}
 */
router.post("/body-mass", async (req, res, next) => {
  let data = {};
  try {
    data = await userService.action(req, res);
    res.status(200);
  } catch (error) {
    data = HTTPError.toHTTPError(error);
    res.status(data.code);
  }
  res.json(data);
});


module.exports = router;
