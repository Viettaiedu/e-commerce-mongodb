const forgotPassword = require("./forgotPassword");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const resetPassword = require("./resetPassword");
const verifyEmail = require("./verifyEmail");

const pathAuth = {
  "/auth/login": {
    post: login,
  },
  "/auth/register": {
    post: register,
  },
  "/auth/logout": {
    post: logout,
  },
  "/auth/verify-email": {
    post: verifyEmail,
  },
  "/auth/forgot-password": {
    post: forgotPassword,
  },
  "/auth/reset-password": {
    post: resetPassword,
  },
};

module.exports = pathAuth;
