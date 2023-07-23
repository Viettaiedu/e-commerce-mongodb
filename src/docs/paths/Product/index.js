const createProduct = require("./createProduct");
const deleteProduct = require("./deleteProduct");
const getAllProducts = require("./getProducts");
const getAllProductsStatic = require("./getProductsStatic");
const getSingleProduct = require("./getSingleProduct");
const updateProduct = require("./updateProduct");
const uploadImageProduct = require("./uploadImageProduct");

const pathProduct = {
  "/products/static": {
    get: getAllProductsStatic,
  },
  "/products": {
    get: getAllProducts,
    post:createProduct
  },
  "/products/{id}": {
    get: getSingleProduct,
    delete: deleteProduct,
    patch: updateProduct,
  },
  "upload-image/{id}": {
    patch: uploadImageProduct,
  }
};

module.exports = pathProduct;
