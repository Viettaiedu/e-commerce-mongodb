const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

module.exports = { generateToken };
