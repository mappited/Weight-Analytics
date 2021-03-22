const { Pool } = require("pg");
const {
  EstabDBCError,
  AccuntAlreadyExistsError,
  BodyMassUniqueViolationError
} = require("../app_modules/exception");


/**
  user_uuid UUID NOT NULL,
  token TEXT NOT NULL UNIQUE,
  creation_time TIMESTAMP,
*/
const SQL_QUERIES = {
  verifySessionToken: `
SELECT
  wcs.wcs.session.user_uuid,
  wcs.wcs.session.creation_time
FROM wcs.wcs.session
  WHERE
    wcs.wcs.session.user_uuid = $1 AND
    wcs.wcs.session.token = $2`,
  createSession: `
INSERT INTO wcs.wcs.session (
  uuid,
  user_uuid,
  token
) VALUES($1, $2, $3)`,
  deleteSession: `
DELETE FROM
  wcs.wcs.session
    WHERE
      wcs.wcs.session.token = $1`,
  createAccount: `
INSERT INTO wcs.wcs.user(
  uuid,
  email,
  "password",
  "name"
) VALUES($1, $2, $3, $4);`,
  deleteAccount: `
DELETE FROM wcs.wcs.user WHERE uuid = $1;
`,
  /**
   * This SQL script verifies account data
   */
  verifyAccount: `
SELECT
  wcs.wcs.user.uuid,
  wcs.wcs.user.name
FROM wcs.wcs.user
  WHERE
    wcs.wcs.user.email = $1 AND
    wcs.wcs.user.password = $2;`,
  /**
   * This SQL inserts a new record into body_mass table
   */
  writeBodyMass: `
INSERT INTO wcs.wcs.body_mass (
  user_uuid,
  mass
) VALUES($1, $2);`,
  readLastBidyMassValue: `
SELECT
  user_uuid,
  mass,
  "date"
FROM wcs.wcs.body_mass
  WHERE user_uuid = $1
    ORDER BY "date" DESC LIMIT 1;`,
  readBodyMass: `
SELECT
  wcs.wcs.body_mass.mass,
  wcs.wcs.body_mass.date
FROM wcs.wcs.body_mass
  WHERE
    wcs.wcs.body_mass.user_uuid = $1 AND
    wcs.wcs.body_mass.date >= $2 AND
    wcs.wcs.body_mass.date <= $3
  ORDER BY "date" DESC;
  `,
  updateSession: `
UPDATE wcs.wcs."session"
  SET update_time = CURRENT_TIMESTAMP
  WHERE "token" = $1;
  `,
  deleteOldSessions: `
DELETE FROM wcs.wcs."session"
  WHERE (CURRENT_TIMESTAMP - update_time) > '1 hours'::INTERVAL;
`
}



class DatabaseProvider {
  static WRITE_BODY_MASS = "WBM";
  static CREATE_ACCOUNT = "CA";
  static READ_BODY_MASS = "RBM";
  static OPEN_CONNECT = "OC";
  static VERIFY_ACCOUNT = "VA";
  static DELETE_ACCOUNT = "DA";
  static DELETE_SESSION = "DS";

  /**
   * @arg poll Poll
   */
  constructor(pool) {
    this._pool = pool;
    this._tasks = {
      "delete_old_sessions": setInterval(() => this.deleteOldSessions(), 0.36e3)
    }
  }

  async updateSession(token) {
    const connection = await this.openConnection();
    try {
      const result = await connection.query(
        SQL_QUERIES.updateSession,
        [token]
      );
      return Boolean(result.rowCount);
    } catch(error) {
      console.log(error);
    } finally {
      connection.release();
    }

  }

  async deleteOldSessions() {
    const connection = await this.openConnection();
    try {
      await connection.query(SQL_QUERIES.deleteOldSessions);
    } catch(error) {
      console.log(error);
    } finally {
      connection.release();
    }
  }

  static pgErrorToException({
    method,
    error
  }) {

    console.error(`error: ${JSON.stringify(error.message)}\ndetail: ${error.detail}`);
    if (
      error.code === "ECONNREFUSED" ||
      error.code === "28P01"
    ) {
      return  new EstabDBCError();
    } else if (method === DatabaseProvider.CREATE_ACCOUNT) {
      // TODO
    } else if (method === DatabaseProvider.WRITE_BODY_MASS) {
      if (error.code === "23505") {
        return new BodyMassUniqueViolationError();
      }
    } else if (method === DatabaseProvider.READ_BODY_MASS) {
      // TODO
    } else if (method === DatabaseProvider.OPEN_CONNECT) {
      // TODO
    } else if (method === DatabaseProvider.VERIFY_ACCOUNT) {
      // TODO
    } else if (method === DatabaseProvider.DELETE_ACCOUNT) {
      // TODO
    } else if (method === DatabaseProvider.DELETE_SESSION) {
      // TODO
    }

    return  new EstabDBCError();
  }

  /**
   * open a connection with PostgreSQL
   */
  async openConnection() {
    let connection = null;
    try {
      connection = await this._pool.connect();
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
        method: DatabaseProvider.OPEN_CONNECT
      });
    }
    return connection;
  }

  /**
   * @arg account: Account
   */
  async createAccount(account) {

    const connection = await this.openConnection();

    try {
      await connection.query(
        SQL_QUERIES.createAccount,
        [account.uuid, account.email, account.password, account.name || ""]
      );
    } catch(error) {
      throw new AccuntAlreadyExistsError();
    } finally {
      connection.release();
    }
  }

  async verifyAccount(account) {
    const connection = await this.openConnection();
    try {
      const data = await connection.query(
        SQL_QUERIES.verifyAccount,
        [account.email, account.password]
      );
      return data.rows[0];
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
        method: DatabaseProvider.VERIFY_ACCOUNT
      });
    } finally {
      connection.release();
    }
  }

  async deleteAccount({ account }) {
    const connection = await this.openConnection();
    try {
      connection.query(
        SQL_QUERIES.deleteAccount,
        [account]
      );
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
        method: this.DELETE_ACCOUNT
      });
    } finally {
      connection.release();
    }
  }

  async createSession(session) {
    const connection = await this.openConnection();
    try {
      await connection.query(
        SQL_QUERIES.createSession,
        [session.uuid, session.userUUID, session.token]
      );
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
      });
    } finally {
      connection.release();
    }
  }

  async deleteSession(session) {
    const connection = await this.openConnection();
    try {
      await connection.query(
        SQL_QUERIES.deleteSession,
        [session.token || "__EMPTY__"]
      );
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
        metod: DatabaseProvider.DELETE_SESSION
      });
    } finally {
      connection.release();
    }
  }

  async writeBodyMass({ account, mass }) {
    const connection = await this.openConnection();
    try {
      await connection.query(
        SQL_QUERIES.writeBodyMass,
        [account.uuid, mass]
      );
      const data = await connection.query(
        SQL_QUERIES.readLastBidyMassValue,
        [account.uuid]
      );
      return data.rows;
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
        method: DatabaseProvider.WRITE_BODY_MASS
      });
    } finally {
      connection.release();
    }
  }

  async readBodyMass({ account, interval }) {
    this.verifyAccount(account);
    const connection = await this.openConnection();
    try {
      const data = await connection.query(
        SQL_QUERIES.readBodyMass,
        [account.uuid, ...interval]
      );
      return data.rows;
    } catch (error) {
      throw DatabaseProvider.pgErrorToException({
        error,
        method: DatabaseProvider.READ_BODY_MASS
      });
    } finally {
      connection.release();
    }
  }

}


const databaseProvider = new DatabaseProvider(new Pool);

module.exports = {
  databaseProvider,
  DatabaseProvider
};
