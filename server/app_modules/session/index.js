const { generateKey } = require("crypto");
const uuid4 = require("uuid").v4;
const Account = require("../account");

class Session {

  constructor({ token, userUUID, uuid } = {}) {
    if (typeof token !== "string" || !token) {
      throw new TypeError("token must be string");
    } else if (typeof userUUID || !userUUID) {
      throw new TypeError("userUUID must be string");
    }
    this.token = token;
    this.userUUID = userUUID;
    this.uuid = uuid || uuid4();
  }

  static createSession(account) {
    return new Promise((resolve, reject) => {
      if (account instanceof Account) {
        generateKey('aes', { length: 256 }, (err, key) => { 
          let token = "";
          if (err) {
            token = key.export().toString('base64'); 
          } else {
            token = Buffer.from(`${uuid4()}${uuid4()}`).toString("base64");
          }
          resolve({
            userUUID: account.uuid,
            uuid: uuid4(),
            token
          });
        });
      } else  {
        reject(TypeError("argument must be instance of Account"));
      }
    });
  }
}

module.exports = Session;
