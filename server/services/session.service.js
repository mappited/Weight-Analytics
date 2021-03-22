const { databaseProvider } = require("../providers/database.provider");
const { 
  InvalidCredentialsError,
  SessionNotFound,
  SessionAlreadyExistsError
} = require("../app_modules/exception")
const Account = require("../app_modules/account");
const Session = require("../app_modules/session");
const TimeZone = require("../app_modules/time_zone");



class Cookie {
  static TOKEN_NAME = "WCS::session";
  static TTL = 0.36E7; // tine to live 
  static TIME_ZONE = TimeZone.getTimezoneOffsetMilliseconds();
  constructor({ token }) {
    this.name = Cookie.TOKEN_NAME;
    this.token = token;
    this.data = {
      maxAge: Cookie.TTL,
      // expire: Date.now() + Cookie.TIME_ZONE,
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    };
  }
}

class SessionService {


  constructor(databaseProvider) {
    this._databaseProvider = databaseProvider;
  }


  setCookie({ response, token }) {
    const cookie = new Cookie({ token });
    response.cookie(cookie.name, cookie.token, cookie.data);
  }

  getCookie(request) {
    return request.cookies[Cookie.TOKEN_NAME];
  }

  deleteCookie(response) {
    return response.clearCookie(Cookie.TOKEN_NAME);
  }

  async verifySession(request, response) {
    const cookieData = this.loadDataFromCookie(request);
    if (
      Boolean(cookieData) && 
      (await this._databaseProvider.updateSession(cookieData.token))
    ){
      this.setCookie({ response, token: this.encode(cookieData) });
    } else {
      cookieData && this.deleteCookie(response);
      throw new SessionNotFound();
    }
    return cookieData;
  }

  async createAccount(credentials) {
    return await await Account.createAccount({
      email: credentials.email || "",
      password: credentials.password || ""
    }); 
  }

  async verifyCredentials(credentials) {
    const account = await this.createAccount(credentials)
    const verifiedAccount = await this._databaseProvider.verifyAccount(account);
    return Boolean(verifiedAccount)
      ? Object.assign(account, verifiedAccount)
      : null;
  }

  loadDataFromCookie(request) {
    const token = this.getCookie(request);
    let data = null;
    try {
      if (Boolean(token)) {
        data = this.decode(token);
      }
    } catch (error) {
      console.log(error);
    }
    return data 
  }


  async createSession(request, response) {
    try {
      await this.verifySession(request, response);
      throw new SessionAlreadyExistsError();
    } catch (error) {
      if (!(error instanceof SessionNotFound)){
        throw error;
      }
    }
    // create an account 
    const account = await this.verifyCredentials(request.body);  
    if (!Boolean(account)) {
      throw new InvalidCredentialsError();
    } else {
      const session = await Session.createSession(account);
      await this._databaseProvider.createSession(session);

      const data = { "user_uuid": account.uuid, "session_uuid": session.uuid };

      this.setCookie({
        response,
        token: this.encode({
          token: session.token,
          ...data 
        })
      });
 
      return data;
    }
  }

  encode(data) {
    return Buffer.from(
      JSON.stringify(data)
    ).toString("base64");
  }

  decode(data) {
    return JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
  }

  async deleteSession(request, response) {
    const cookieData = await this.verifySession(request, response);
    await this._databaseProvider.deleteSession(cookieData);
    this.deleteCookie(response);
    return { "message": "The session is closed" }; 
  }

}


const sessionService = new SessionService(databaseProvider);

module.exports = {
  sessionService,
  SessionService
}
