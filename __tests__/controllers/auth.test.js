// Mock các module cần sử dụng
jest.mock("../../models/User");
jest.mock("../../utils/generateToken", () => ({
  generateToken: jest.fn((x) => x),
}));
jest.mock("../../utils/bcrypt", () => ({
  comparePWD: jest.fn((x) => x),
}));
jest.mock("../../utils/sendVerification");
jest.mock("../../utils/createTokenUser");
jest.mock("../../models/Token");
jest.mock("../../utils/sendResetPasswordEmail");
jest.mock("../../utils/createHash");
jest.mock("../../utils/createHash");
// Import các module cần thiết
const User = require("../../models/User");
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
} = require("../../controllers/auth");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../../errors");
const { generateToken } = require("../../utils/generateToken");
const { StatusCodes } = require("http-status-codes");
const { comparePWD } = require("../../utils/bcrypt");
const sendVerificationEmail = require("../../utils/sendVerification");
const Token = require("../../models/Token");
const sendResetPasswordEmail = require("../../utils/sendResetPasswordEmail");
const hashString = require("../../utils/createHash");
// Helper function để tạo request và response

const mockReq = (body) => ({ body });
const mockUserFc = ({
  email,
  password = "correct_password",
  role = "user",
  isVerified = false,
  verificationToken = "token",
  ...args
}) => {
  return {
    id: "id_1",
    email,
    password,
    role,
    isVerified,
    verificationToken,
    ...args,
  };
};
const res = { status: jest.fn((x) => x), json: jest.fn((x) => x) };

describe("API AUTH", () => {
  // Register
  describe("POST /api/v1/auth/register", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    // TEST CASE : Error bad request khi email hiện có!
    test("Should send throw bad request(status code: 400) when email exists", async () => {
      const req = mockReq({ email: "exist_email@gmail.com" });
      const mockUserValue = mockUserFc({ email: req.body.email });
      User.findOne.mockResolvedValue(mockUserValue);
      await expect(register(req, res)).rejects.toThrow(BadRequestError);
      expect(res.status).not.toHaveBeenCalledWith();
      expect(res.json).not.toHaveBeenCalledWith();
    });

    // TEST CASE : role là admin khi người đăng ký đầu tiên!
    test("Should role is admin when the first sign up", async () => {
      const req = mockReq({ email: "exist_email@gmail.com" });
      User.findOne.mockResolvedValue(undefined);
      User.countDocuments.mockResolvedValue(0);
      await register(req, res);
      expect(req.body.role).toBe("admin");
      expect(res.status).not.toHaveBeenCalledWith();
      expect(res.json).not.toHaveBeenCalledWith();
    });

    // TEST CASE : Tạo mới người dùng thành công với status code 201
    test("Should (status code: 201) && create new user && role is user", async () => {
      const req = mockReq({ email: "exist_email@gmail.com" });
      User.findOne.mockResolvedValue(undefined);
      User.countDocuments.mockResolvedValue(10);
      const mockUser = mockUserFc({ email: req.body.email });
      User.create.mockResolvedValue(mockUser);
      await register(req, res);
      expect(generateToken).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith({ ...req.body });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(res.json).toHaveBeenCalled();
    });
  });

  // LOGIN
  describe("POST /api/v1/auth/login", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    // TEST CASE :Ném lỗi bad request(status code:400) khi email không hợp lệ
    test("Should send bad request(status code 400) when email is invalid", async () => {
      const req = mockReq({ email: "invalid_email@gmail.com" });
      User.findOne.mockResolvedValue(undefined);
      await expect(login(req, res)).rejects.toThrow(BadRequestError);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE :Ném lỗi bad request(status code:400) khi password không hợp lệ
    test("Should send bad request(status code 400) when password incorrect", async () => {
      const req = mockReq({
        email: "invalid_email@gmail.com",
        password: "correct_password",
      });
      const mockUser = mockUserFc({
        email: req.body.email,
        password: "hash_password",
      });
      User.findOne.mockResolvedValue(mockUser);
      comparePWD.mockResolvedValue(false);
      await expect(login(req, res)).rejects.toThrow(BadRequestError);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(comparePWD).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE :Ném lỗi unauthenticated(status code:401) khi email chưa được xác minh.
    test("Should send unauthenticated(status code 401) when email unverified", async () => {
      const req = mockReq({
        email: "invalid_email@gmail.com",
        password: "correct_password",
      });
      const mockUser = mockUserFc({
        email: req.body.email,
        password: "hash_password",
      });
      User.findOne.mockResolvedValue(mockUser);
      comparePWD.mockResolvedValue(true);
      await expect(login(req, res)).rejects.toThrow(UnauthenticatedError);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(sendVerificationEmail).toHaveBeenCalledTimes(1);
      expect(comparePWD).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    // Nên gửi authenticated error khi token hiện có và mã đã hết hạn.

    // test("Should authenticated when token existing and expired token", async () => {
    //   const req = mockReq({
    //     email: "invalid_email@gmail.com",
    //     password: "correct_password",
    //   });
    //   const mockUser = mockUserFc({
    //     id: req.body.id,
    //     email: req.body.email,
    //     password: "hash_password",
    //     isVerified: true,
    //   });
    //   User.findOne.mockResolvedValue(mockUser);
    //   comparePWD.mockResolvedValue(true);
    //   const mockExistingToken = {
    //     id: mockUser.id,
    //     isValid: false,
    //   };
    //   const mockTokenUser = {
    //     id: mockUser.id,
    //     email: mockUser.email,
    //   };
    //     createTokenUser.mockResolvedValue(mockTokenUser);
    //   Token.findOne.mockResolvedValue(mockExistingToken);
    //   await expect(login(req, res)).rejects.toThrow(UnauthenticatedError);
    //   expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    //   expect(sendVerificationEmail).not.toHaveBeenCalled();
    //   expect(comparePWD).toHaveBeenCalledWith(
    //     req.body.password,
    //     mockUser.password
    //   );
    //   expect(createTokenUser).toHaveBeenCalled();
    //   expect(Token.findOne).toHaveBeenCalled({ userId: mockUser.id });
    //   expect(res.status).not.toHaveBeenCalled();
    //   expect(res.json).not.toHaveBeenCalled();
    // });
    // Nên gửi Unauthenticated khi token hết hạn.

    // Nên gửi status code 200 khi token còn hạn.

    // Nên gửi NOT OK khi token không hiện có.

    // Nên gửi tạo token và gửi status code 200 khi token hết hạn.
  });

  // VERIFY EMAIL
  describe("POST /api/v1/auth/verify-email", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    // TEST CASE: Xác minh email không hợp lệ.
    test("Should throw bad request(status code:400) error when email is invalid", async () => {
      const req = mockReq({ email: "verify_email@gmail.com" });
      User.findOne.mockResolvedValue(undefined);
      await expect(verifyEmail(req, res)).rejects.toThrow(BadRequestError);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE: Xác minh email thất bại
    test("Should throw Unauthentication (status code:401) error when verificationToken is invalid", async () => {
      const req = mockReq({
        email: "verify_email@gmail.com",
        verificationToken: "verification_token",
      });
      const mockUser = mockUserFc({
        email: req.body.email,
        verificationToken: "invalid_verification_token",
      });
      User.findOne.mockResolvedValue(mockUser);
      await expect(verifyEmail(req, res)).rejects.toThrow(UnauthenticatedError);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE: Xác minh email thành công
    test("Should (status code: 200) when verified successfully", async () => {
      const req = mockReq({
        email: "verify_email@gmail.com",
        verificationToken: "verification_token",
      });
      const mockUser = mockUserFc({
        email: req.body.email,
        verificationToken: "verification_token",
      });
      User.findOne.mockResolvedValue(mockUser);
      const mockSave = jest.fn().mockResolvedValue();
      mockUser.save = mockSave;
      await verifyEmail(req, res);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(mockUser.isVerified).toBe(true);
      expect(mockUser.verified).not.toBe(null);
      expect(mockUser.verificationToken).toBe("");
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // FORGOT PASSWORD
  describe("POST /api/v1/auth/forgot-password", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    // TEST CASE: Bad request khi email không hợp lệ.
    test("Should throw bad request (status code: 400) when email is invalid", async () => {
      const req = mockReq({ email: "example@gmail.com" });
      User.findOne.mockResolvedValue(undefined);
      await expect(forgotPassword(req, res)).rejects.toThrow(BadRequestError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE: Thành công
    test("Should (status code: 200) when email is valid", async () => {
      const req = mockReq({ email: "example@gmail.com" });
      const mockUser = mockUserFc({ email: req.body.email });
      User.findOne.mockResolvedValue(mockUser);
      const mockSave = jest.fn().mockResolvedValue();
      mockUser.save = mockSave;
      await forgotPassword(req, res);
      expect(generateToken).toHaveBeenCalled();
      expect(sendResetPasswordEmail).toHaveBeenCalled();
      expect(hashString).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // RESET PASSWORD

  describe("POST /api/v1/auth/reset-password", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    // TEST CASE : Bad request khi Token hoặc Email không hợp lệ
    test("Should throw bad request (status code: 400) when token or email is invalid", async () => {
      const req = mockReq({ token: null, email: null });
      await expect(resetPassword(req, res)).rejects.toThrow(BadRequestError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE : Bad request khi Password số kí tự bé hơn 6
    test("Should throw bad request (status code: 400) when the length password less more 6", async () => {
      const req = mockReq({
        token: "token",
        email: "email@gmail.com",
        password: "1231",
      });
      await expect(resetPassword(req, res)).rejects.toThrow(BadRequestError);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE : Not found khi không tìm thấy email người dùng.
    test("Should not found (status code:404) when user not found", async () => {
      const req = mockReq({
        token: "token",
        email: "email@gmail.com",
        password: "1231122",
      });
      User.findOne.mockResolvedValue(undefined);
      await expect(resetPassword(req, res)).rejects.toThrow(NotFoundError);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    // TEST CASE : Cập nhật mật khẩu thành công.
    test("Should status code 200 when updated successfully", async () => {
      const req = mockReq({
        token: "token",
        email: "email@gmail.com",
        password: "1231122",
      });
      const mockUser = mockUserFc({
        ...req.body,
        passwordToken: "token_secret",
        passwordTokenExpirationDate: new Date(Date.now() + 1000 * 60 * 15), // lớn hơn hiện tại 15 phút
      });
      User.findOne.mockResolvedValue(mockUser);
      hashString.mockResolvedValue("token_secret");
      const mockSave = jest.fn().mockResolvedValue();
      mockUser.save = mockSave;
      await resetPassword(req, res);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(hashString).toHaveBeenCalledWith(req.body.token);
      expect(mockUser.password).toBe(req.body.password);
      expect(mockUser.passwordToken).toBe(null);
      expect(mockUser.passwordTokenExpirationDate).toBe(null);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalled();
    });

    // TEST CASE : Người dùng không có quyền đặt lại mật khẩu
    test("Should throw  Unauthenticated (status code:401) when passworkToken or passwordTokenExpirationDate is not valid", async () => {
      const req = mockReq({
        token: "token",
        email: "email@gmail.com",
        password: "1231122",
      });
      const mockUser = mockUserFc({
        ...req.body,
        passwordToken: "token_secret",
        passwordTokenExpirationDate: new Date(Date.now() - 1000 * 60 * 15), // lớn hơn hiện tại 15 phút
      });
      User.findOne.mockResolvedValue(mockUser);
      hashString.mockResolvedValue("incorrect_token_secret");
      await expect(resetPassword(req, res)).rejects.toThrow(
        UnauthenticatedError
      );
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(hashString).toHaveBeenCalledWith(req.body.token);
      expect(res.status).not.toHaveBeenCalledWith();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  // LOGOUT
  describe("POST /api/v1/auth/logout", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    // TEST CASE : Status code 200 khi mà người dùng đăng xuất thành công.
    test("Should status code 200 when user is logged out successfully", async () => {
      const req = { userInfo: { userId: "user_id" } };
      Token.findOneAndDelete.mockResolvedValue(true);
      const mockCookie = jest.fn();
      res.cookie = mockCookie;
      await logout(req, res);
      expect(mockCookie).toHaveBeenCalledWith("accessToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      expect(mockCookie).toHaveBeenCalledWith("refreshToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalled();
    });
  });
});