const { databaseProvider } = require("../providers/database.provider");
const {
  InvalidCredentialsError
} = require("../app_modules/exception")
const Account = require("../app_modules/account");

class AccountService {

  constructor(databaseProvider) {
    this._databaseProvider = databaseProvider;
  }

  async createAccount(data) {
    const account = await Account.createAccount({
      email: data.email || "",
      password: data.password || ""
    });
    return this._databaseProvider.createAccount(account);
  }

  async verifyAccount(data) {
    const account = await Account.createAccount({
      email: data.email || "",
      password: data.password || ""
    });
    const verifiedAccount = this._databaseProvider.verifyAccount(account);
    if (verifyAccount !== undefined) {
      return verifiedAccount;
    } else {
      throw new InvalidCredentialsError();
    }
  }

}



const accountService = new AccountService(databaseProvider);


module.exports = {
  accountService,
  AccountService
}
