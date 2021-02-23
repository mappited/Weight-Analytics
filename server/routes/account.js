const express = require('express');
const router = express.Router();
const crypto = require('crypto');



class Account {

  static get PASSWOR_LENGHT() {
    return 6;
  }

  static get SALT() {
    return process.env.SALT || "locjKkTO61czhIkOMga2eTw2dEQYU73E3ZAvBwIsbFo=";
  }

  constructor({ email, password }) {
    this.email = (email || "").toLowerCase();
    this.password = password || "";
  }

  get isValid() {
    return /^[a-z]+@[a-z]+.[a-z]+$/i.test(this.email) &&
      this.password.length >= Account.PASSWOR_LENGHT;
  }

  async makeData() {
    return new Promise((resolve, reject) => {
      if (!this.isValid)
        return reject(new Error("invalid data"));
      const hash = crypto.createHash('sha256');
      hash.on("readable", () => {
        const data = hash.read();
        if (data) {
          resolve({
            email: this.email,
            password: data.toString('hex')
          });
        }
      });
      hash.write(`${this.password}${Account.SALT}`);
      hash.end();
    });
  }
}

/* GET home page. */
router.post('/auth', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post("/sign-up", async (req, res, nex) => {
  const accountData = new Account(req.body);
  try {
    const data = await accountData.makeData();
    res.json({ststus: "success", data });
  } catch(error) {
    res.status(400);
    res.json({ ststus: "failure", error: error.message });
  }
});

router.post("/sign-in", async (req, res, nex) => {
  const accountData = new Account(req.body);
  try {
    const data = await accountData.makeData();
    res.json({ststus: "success", data });
  } catch(error) {
    res.status(400);
    res.json({ ststus: "failure", error: error.message });
  }
});


module.exports = router;

