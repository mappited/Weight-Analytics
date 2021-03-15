const express = require('express');
const router = express.Router();
const { HTTPError } = require("../app_modules/exception")
const { accountService } = require("../services/account.service");
const { sessionService } = require("../services/session.service");


/**
 * Request body
 *    {"email": "...", "password": "..."}
 * Response:
 *    CODE 201  {"status_code": 201, "status": "created", "data": {"client_uuid": <string>}}
 *    CODE 401  {"status_code": 401, "status": "unauthorized", "error": {"code": <number>, "message": <string>}}
 */
router.post("/sign-up", async (req, res, next) => {
  let data = {};
  try {
    console.log(req.body);
    data = await accountService.createAccount(req.body);
    res.status(201);
  } catch (error) {
    data = HTTPError.toHTTPError(error);
    res.status(data.code);
  }
  res.json(data);
});

/**
 * Request body
 *    {"email": "...", "password": "..."}
 * Response:
 *    CODE 200  {"status_code": 200, "status": "success", "data": {"client_uuid": <string>, "token": <string>}}
 *    CODE 401  {"status_code": 401, "status": "unauthorized", "error": {"code": <number>, "message": <string>}}
 */
router.post("/sign-in", async (req, res, next) => {
  let data = {};
  try {
    data = await sessionService.createSession({ credentials: req.body, req, res });
    res.status(200);
  } catch (error) {
    data = HTTPError.toHTTPError(error);
    res.status(data.code);
  }
  res.json(data);
});

/**
 * Request body
 *    {"token": "..."}
 * Response:
 *    CODE 200  {"status_code": 200, "status": "accepted", "data": {"client_uuid": <string>, "timestamp": <number>}}
 *    CODE 401  {"status_code": 401, "status": "unauthorized", "error": {"code": <number>, "message": <string>}}
 */
router.post("/sign-out", async (req, res, next) => {
  let data = {};
  try {
    data = await sessionService.createSession(req.body);
  } catch (error) {
    data = HTTPError.toHTTPError(error);
    res.status(data.code);
  }
  res.json(data);
});


module.exports = router;
