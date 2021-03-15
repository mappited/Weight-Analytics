
const ZONE = [
  "MSK"
].reduce((_enum, elem, index) => {
  _enum[_enum[index] = elem] = index;
  return _enum;
}, {});

class TimeZone {
  static MSK = +03

  static getTimezoneOffsetMilliseconds() {
    const offset = new Date().getTimezoneOffset();
    const sign = offset < 0 ? 1 : -1;
    return sign * (Math.abs(offset/60) + Math.abs(offset%60)) * 0.36E7;
  }
}


module.exports = TimeZone;
