let express = require('express');
let router = express.Router();
let FirebaseProvider = require("../app_modules/firebase");

FirebaseProvoder.connectToEmulator();

class Connectable {
  _firebaseDB
  consturctor(
    db = FirebaseProvider.connectToEmulator()
  ) {
    this._firebaseDB = db;
  }
}

class Account extends Connectable {
  _name;
  _email;
  constructor({ name, email, db }) {
    super(db);
    this._name = name;
    this._email = email;
  }
}

class Session extends Connectable {
  _request;
  _response;
  constructor({ request, response, db }) {
    super(db);
    this._request = request;
    this._response = response;
  }

  async check() {

  }

  async create() {

  }

  async delete() {

  }
}



router.get('/', function(req, res, next) {
  console.log(req.params);
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/:uid', function(req, res, next) {
  console.log(req.params);
  console.log(res.headers);
  res.send('respond with a resource');
});



module.exports = router;
