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
 *            description: The auto-generated id of the Auth
 *          name:
 *            type: string
 *            description: Your name
 *          email:
 *            type: string
 *            description: Your email
 *          password:
 *            type: string
 *            description: Your password
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
 *    summary: Login a user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Auth'
 *          example:
 *            email: "your email"
 *            password: "your password"
 *    responses:
 *      200:
 *        description: Login in successful  
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email or password is not valid
 *      401:
 *        description: Authentication failed
 *      500:
 *        description: Something went wrong
 */

// --------REGISTER----------
router.route("/register").post(register);
/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: Create a new user
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
 *        description: The user was created successfully and check your email to verify it
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email is existing
 *      500:
 *        description: Something went wrong
 */


// --------LOGOUT----------
router.route("/logout").post(authenticateUser, logout);
/**
 * @swagger
 * /api/v1/auth/logout:
 *  post:
 *    summary: Logout from system
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Logout successfully
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'
 *      401:
 *        description: Authentication invalid
 *      500:
 *        description: Something went wrong
 */

// --------VERIFY EMAIL----------
router.route("/verify-email").post(verifyEmail);
/**
 * @swagger
 * /api/v1/auth/verify-email:
 *  post:
 *    summary: Verify email
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *            example:
 *              verificationToken: "your code"
 *              email: "your_email"
 *    responses:
 *      200:
 *        description: Verified successfully
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      401:
 *        description: Authentication Failed
 *      500:
 *        description: Something went wrong
 */

// --------FORGOT PASSWORD----------
router.route("/forgot-password").post(forgotPassword);
/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *  post:
 *    summary: Forgot password
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
 *        description: forgot successfully
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email is not existing
 *      500:
 *        description: Something went wrong
 */

// --------RESET PASSWORD----------
router.route("/reset-password").post(resetPassword);
/**
 * @swagger
 * /api/v1/auth/reset-password:
 *  post:
 *    summary: reset password
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *            example:
 *              token: "your code"
 *              email: "your email"
 *              password: "your new password"
 *    responses:
 *      200:
 *        description: reset successfully
 *        content:  
 *          application/json:  
 *            schema:  
 *              #ref: '#/components/schemas/Auth'  
 *      400:
 *        description: Email or code or password is invalid
 *      500:
 *        description: Something went wrong
 */
module.exports = router;
