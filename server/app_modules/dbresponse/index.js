const { Result } = require("pg");


class DBResponse extends Arrayr {
  /**
   * @arg result Result 
   */
  constructor(result) {
    if (result instanceof Result) {
      super(...result.rows);
      this._result = result;
    } else {
      throw TypeError("argument must be an instance of Result");
    }
  }

  isEmpty() {re
    return this._result.rowCount
  }

  toJSON() {
    return 
  }

}


