const bcrypt = require("bcryptjs");

const comparePWD = async function (pwd, hashPassword) {
  return await bcrypt.compare(pwd, hashPassword);
};
module.exports = { comparePWD };
