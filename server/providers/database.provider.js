const { Pool } = require("pg");
const {
  EstabDBCError,
  AccuntAlreadyExistsError
} = require("../app_modules/exception");

const process = require("process");

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
  user_uuid,
  token
) VALUES($1, $2)`,
  deleteSession: `
DELETE FROM
  wcs.wcs.session 
    WHERE 
      wcs.wcs.session.user_uuid = $1 AND
      wcs.wcs.session.token = $2`,
  createAccount: `
INSERT INTO wcs.wcs.user(
  uuid,
  email,
  "password",
  "name"
) VALUES($1, $2, $3, $4);`,
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
) VALUES($1, $2)`,
  readBodyMass: `
SELECT 
  wcs.wcs.user.uuid,
  wcs.wcs.user.email,
  wcs.wcs.user.name
FROM wcs.wcs.body_mass
  WHERE
    wcs.wcs.body_mass.user_uuid = $1 AND
    wcs.wcs.body_mass.date <= $2 AND
    wcs.wcs.body_mass.data > $3;
  `
}



class DatabaseProvider {
  /**
   * @arg poll Poll
   */
  constructor(pool) {
    this._pool = pool;
  }

  static pgErrorToException(error) {
    // TODO add logger
    console.error(`error: ${JSON.stringify(error.message)}`);
    switch (error.code) {
      case "23505": // unique_violation
        // TDOD 
        return  new EstabDBCError();
        break;
      default:
        return new EstabDBCError();
        break;
    }
  }

  /**
   * open a connection with PostgreSQL
   */
  async openConnection() {
    let connection = null;
    try {
      connection = await this._pool.connect();
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
    }
    return connection;
  }

  /**
   * @arg account Account
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
      throw DatabaseProvider.pgErrorToException(error);
    } finally {
      connection.release();
    }
  }

  async removeAccount({ uuid }) {
    const connection = await this.openConnection();
    try {
      // TODO
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
    } finally {
      connection.release();
    }
  }

  async createSession(session) {
    console.log(session);
    const connection = await this.openConnection();
    try {
      await connection.query(
        SQL_QUERIES.createSession,
        [session.userUUID, session.token]
      );
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
    } finally {
      connection.release();
    }
  }

  async removeSession(session) {
    const connection = await this.openConnection();
    try {
      // TODO
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
    } finally {
      connection.release();
    }
  }

  async validateSession(session) {
    const connection = await this.openConnection();
    try {
      // TODO
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
    } finally {
      connection.release();
    }
  }

  async writeBodyMass({ account, mass }) {
    this.verifyAccount(account);
    const connection = await this.openConnection();
    try {
      // TODO
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
    } finally {
      connection.release();
    }
  }

  async readBodyMass({ account, interval }) {
    this.verifyAccount(account);
    const connection = await this.openConnection();
    try {
      // TODO
    } catch (error) {
      throw DatabaseProvider.pgErrorToException(error);
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
