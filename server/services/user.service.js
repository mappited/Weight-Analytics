const { sessionService } = require("./session.service");
const { databaseProvider } = require("../providers/database.provider");
const {
  MethodError,
  MassError,
  InvalidDateError
} = require("../app_modules/exception");
const Account = require("../app_modules/account");


class DateISO extends Date {
  static WEEK = "week";
  static TWO_WEEKS = "two_weeks";
  static MONTH = "month";
  static HALF_YEAR = "half_year";
  static YEAR = "year";

  constructor(date = Date.now()) {
    let data = new Date();
    if (DateISO.WEEK === date) {
      data = new Date(data.setDate(data.getDate() - 6));
    } else if (DateISO.TWO_WEEKS === date) {
      data = new Date(data.setDate(data.getDate() - 13));
    } else if (DateISO.MONTH === date) {
      data = new Date(data.setDate(data.getDate() - 30));
    } else if (DateISO.HALF_YEAR === date) {
      data = new Date(data.setDate(data.getDate() - 183));
    } else if (DateISO.YEAR === date) {
      data = new Date(data.setDate(data.getDate() - 364));
    } else {
      data =  new Date(date);
      if (data.toString() === "Invalid Date") {
        throw new InvalidDateError();
      }
    }
    super(data);
  }

  getDateISOFormat() {
    return this.toISOString().split("T")[0];
  }

  getDateTimeISOFormat() {
    return this.toISOString();
  }
}


class UserService {

  constructor({
    sessionService,
    databaseProvider
  }) {
    this._sessionService = sessionService;
    this._databaseProvider = databaseProvider;
  }

  initInterval(data) {
    let date1 = new DateISO();
    let date2 = new DateISO();

    if (
      data.first === DateISO.WEEK ||
      data.first === DateISO.TWO_WEEKS ||
      data.first === DateISO.MONTH ||
      data.first === DateISO.HALF_YEAR ||
      data.first === DateISO.YEAR
    ) {
      date2 = new DateISO(data.first);
    } else {
      date1 = new DateISO(data.first || new DateISO());
      date2 = new DateISO(data.second || new DateISO());
    }

    return (
      date1 < date2
        ? [date1, date2]
        : [date2, date1]
    );
  }


  async read({ data, account }) {
    const interval = this.initInterval(data);
    const result = await this._databaseProvider.readBodyMass({
      interval,
      account
    });
    return {
      size: result.length,
      first: interval[0],
      second: interval[1],
      data: result
    };
  }

  async write({ data, account }) {
    const mass = Number(data.mass);
    if (Number.isNaN(mass)) {
      throw new MassError();
    } else {
      const data = await this._databaseProvider.writeBodyMass({ account, mass });
      return { data: data[0] };
    }
  }


  async action(request, response) {
    const session = await this._sessionService.verifySession(request, response);
    const account = new Account({ uuid: session.user_uuid }, false);
    const data = request.body || { action: "read" };

    if (/^pull$|^read$/i.test(data.action)) {
      return await this.read({ data, account });
    } else if (/^push$|^write$/i.test(data.action)) {
      return await this.write({ data, account });
    } else {
      throw new MethodError();
    }
  }
}


const userService = new UserService({ sessionService, databaseProvider });


module.exports = {
  userService,
  userService
}
