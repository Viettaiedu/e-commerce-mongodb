const router = require("express").Router();

const {
  getAllProducts,
  getAllProductsStatic,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/product");
const upload = require("../helpers/upload");
const {
  authenticateUser,
  authorizePermession,
} = require("../middleware/authentication");





router.get("/static", getAllProductsStatic);


router.get("", getAllProducts);
router
  .route("")
  .post(authenticateUser, authorizePermession("admin"), createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticateUser, authorizePermession("admin"), updateProduct)
  .delete(authenticateUser, authorizePermession("admin"), deleteProduct);
router
  .route("/upload-image/:id")
  .patch(authenticateUser, authorizePermession("admin"), upload, uploadImage);
module.exports = router;
