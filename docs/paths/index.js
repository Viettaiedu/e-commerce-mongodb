// PATHS
const pathAuth = require("./Auth");
const pathProduct = require("./Product");
const paths = {
  // PATH PRODUCT
  ...pathProduct,
  // PATH AUTH
  ...pathAuth,
};

module.exports = paths;
