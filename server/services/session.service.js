const { databaseProvider } = require("../providers/database.provider");
const { 
  InvalidCredentialsError
} = require("../app_modules/exception")
const Account = require("../app_modules/account");
const Session = require("../app_modules/session");

class Cookie {
  static TOKEN_NAME = "wcs_token";
  constructor({ token }) {
    this.name = Cookie.TOKEN_NAME;
    this.token = token;
    this.data = {
      maxAge: 36 * 1e5,
      expire: Date.now(),
      httpOnly: true,
      secure: true 
    };
  }
}

class SessionService {


  constructor(databaseProvider) {
    this._databaseProvider = databaseProvider;
  }
  

  async verifySession(request) {
    return Boolean(request.cookies[SessionService.TOKEN_NAME]);
  }

  async createSession({
    credentials, req, res
  }) {

    const account = await Account.createAccount({
      email: credentials.email || "",
      password: credentials.password || ""
    });
    const verifiedAccount = await this._databaseProvider.verifyAccount(account);
    if (verifiedAccount !== undefined) {
      account.uuid = verifiedAccount.uuid;
      const session = await Session.createSession(account);
      await this._databaseProvider.createSession(session);
      const cookie = new Cookie(session);
      res.cookie(cookie.name, cookie.token, cookie.data);
      return {
        "user_uuid": session.userUUID,
        "session_uuid": session.uuid
      };
    } else {
      throw new InvalidCredentialsError();
    }
  }
  
  async deleteSession(token) {
    // TODO
  }

}


const sessionService = new SessionService(databaseProvider);

module.exports = {
  sessionService,
  SessionService
}
