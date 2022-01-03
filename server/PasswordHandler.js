//source: https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/

const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString("hex");
  return { salt, hash };
}

function validPassword(salt, password, hash) {
  const check = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString("hex");
  return check == hash;
}

module.exports = { hashPassword, validPassword };
