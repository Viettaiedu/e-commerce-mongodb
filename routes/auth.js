const router = require("express").Router();
const {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { authenticateUser } = require("../middleware/authentication");
/**
 * @swagger
 * components:
 *    schemas:
 *      Auth:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: string
 *            description: ID sẽ được tạo tự động
 *          name:
 *            type: string
 *            description: Tên của bạn
 *          email:
 *            type: string
 *            description: Email của bạn
 *          password:
 *            type: string
 *            description: Mật khẩu của bạn
 *        example:
 *          name: "tai viet"
 *          email: "viettaixca123@gmail.com"
 *          password: "123123"
 *
 */

/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: The Auth managing API
 */

// --------LOGIN----------
router.route("/login").post(login);
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Người dùng đăng nhập
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Auth'
 *          example:
 *            email: "your_email"
 *            password: "your_password"
 *    responses:
 *      200:
 *        description: Đăng nhập thành công 
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email và password không hợp lệ.
 *      401:
 *        description: Xác thực thất bại
 *      500:
 *        description: Lỗi server
 */

// --------REGISTER----------
router.route("/register").post(register);
/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: Tạo mới một người dùng
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *            example:
 *              name: "your_name"
 *              email: "your_email"
 *              password: "your_password"
 *    responses:
 *      201:
 *        description: Bạn đã tạo thành công.
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email hiện đã tồn tại
 *      500:
 *        description: Lỗi Server
 */


// --------LOGOUT----------
router.route("/logout").post(authenticateUser, logout);
/**
 * @swagger
 * /api/v1/auth/logout:
 *  post:
 *    summary: Đăng xuất khỏi hệ thống
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Đăng xuất thành công
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'
 *      401:
 *        description: Xác thực không hợp lệ
 *      500:
 *        description: Lỗi Server
 */

// --------VERIFY EMAIL----------
router.route("/verify-email").post(verifyEmail);
/**
 * @swagger
 * /api/v1/auth/verify-email:
 *  post:
 *    summary: Xác minh email
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *            example:
 *              verificationToken: "your_code"
 *              email: "your_email"
 *    responses:
 *      200:
 *        description: Xác minh email thành công
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      401:
 *        description: Xác minh thất bại
 *      500:
 *        description: Lỗi Server
 */

// --------FORGOT PASSWORD----------
router.route("/forgot-password").post(forgotPassword);
/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *  post:
 *    summary: Quên mật khẩu
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *            example:
 *              email: "your_email"
 *    responses:
 *      200:
 *        description: Quên mật khẩu thành công
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email không hiện tồn tại.
 *      500:
 *        description: Lỗi Server
 */

// --------RESET PASSWORD----------
router.route("/reset-password").post(resetPassword);
/**
 * @swagger
 * /api/v1/auth/reset-password:
 *  post:
 *    summary: Đặt lại mật khẩu
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *            example:
 *              token: "your_code"
 *              email: "your_email"
 *              password: "your_new_password"
 *    responses:
 *      200:
 *        description: Đặt lại mật khẩu thành công
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email hoặc mã code hoặc password không hợp lệ
 *      500:
 *        description: Lỗi Server
 */
module.exports = router;
