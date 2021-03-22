const crypto = require("crypto");
const uuid4 = require("uuid").v4;
const exception = require("../../app_modules/exception");


class Account {

  static PASSWD_MIN_LEN = 6;
  static SALT = process.env.SALT || "locjKkTO61czhIkOMga2eTw2dEQYU73E3ZAvBwIsbFo=";

  static async createAccount({ email, password }, isSecurePassword = true){
    email = email.toLowerCase();
    if (isSecurePassword && !(/^[a-z][a-z_\-\.]*@\w+\.\w+$/i.test(email))) {
      throw new exception.EmailError();
    } else if (isSecurePassword && password.length < Account.PASSWD_MIN_LEN) {
      throw new exception.PasswordIsNotSecure();
    }
    const hash = await Account.makePasswordHash(password);
    return new Account({ email, password: hash });
  }

  constructor({ email, password, uuid }, isSecurePassword = true) {
    this.uuid = uuid || uuid4();
    this.email = (email || "").toLowerCase();
    if (isSecurePassword && password.length < Account.PASSWD_MIN_LEN) {
      throw new exception.PasswordIsNotSecure();
    }
    this.password = password;
  }

  static makePasswordHash(password) {
    return new Promise((resolve) => {
      const hash = crypto.createHash('sha256');
      hash.on("readable", () => {
        const data = hash.read();
        if (data) {
          resolve(data.toString('hex'));
        }
      });
      hash.write(`${password}::${Account.SALT}`);
      hash.end();
    });
  }
}

module.exports = Account;
