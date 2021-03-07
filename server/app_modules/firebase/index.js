const process = require("process");
const admin = require("firebase-admin");


class Document {
  _id;
  constructor() {}
}


class Snapshot {
  constructor(data) {
    this._data = data
  }
  val() {
    return this._data;
  }
}

class Collection {
  _name;
  _data = {};

  constructor(name) {
    this._name = name;
  }

  async push({ key, data }) {
    if (Object.prototype.toString.call(data) === "[object Object]") {
      if (!this._data[key]) {
        this._data[key] = {};
      }
      Object.assign(this._data[key], data);
    } else {
      throw TypeError("data must be an object");
    }
  }

  async once({ key }) {
    return new Snapshot(this._data[key] || null);
  }

  toJSON() {
    return this._data;
  }
}

class CollectionProvider {
  _key;
  _collection;
  constructor({ collection, key }) {
    this._key = key;
    this._collection = collection;
  }
  async once() {
    return this._collection.once({ key: this._key });
  }
  async push(data) {
    return this._collection.push({ key: this._key, data });
  }
}

class FirebaseImitator {
  _store = {}

  async ref(key) {
    const keys = key.split("/");
    const pk = keys[0];
    if (!this._store[pk]) {
      this._store[pk] = new Collection(pk);
    }
    return new CollectionProvider({
      collection: this._store[pk],
      key: keys.slice(1).join("/")
    });
  }

  toJSON() {
    return this._store;
  }
}

class FirebaseProvoder {

  static #connection = null;
  static #imitator = null;

  connectToRealFirebaseDB() {
    FirebaseProvoder.connectToRealFirebaseDB();
  }

  connectToImitator() {
    FirebaseProvoder.connectToImitator();
  }

  static connectToRealFirebaseDB() {
    if (FirebaseProvoder.#connection === null) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: process.env["WCS_FIREBASE_URL"]
      });
      FirebaseProvoder.#connection = admin.database();
    }
    return FirebaseProvoder.#connection;
  }

  static connectToEmulator() {
    if (FirebaseProvoder.#imitator === null) {
      FirebaseProvoder.#imitator = new FirebaseImitator();
    }

    return FirebaseProvoder.#imitator;
  }

}


module.exports = FirebaseProvoder;
