const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { attachCookiesResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");
const sendVerificationEmail = require("../utils/sendVerification");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const Token = require("../models/Token");
const { generateToken } = require("../utils/generateToken");
const { comparePWD } = require("../utils/bcrypt");
const hashString = require("../utils/createHash");

const register = async (req, res) => {
  const { email } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) throw new BadRequestError("Email hiện đã tồn tại!");
  const isFirstUser = (await User.countDocuments({})) === 0;
  if (isFirstUser) {
    req.body.role = "admin";
  }
  const verificationToken = await generateToken();
  req.body.verificationToken = verificationToken;
  const user = await User.create({ ...req.body });
  // const origin = "http://localhost:4000";
  // await sendVerificationEmail({
  //   name: user.name,
  //   email: user.email,
  //   verificationToken,
  //   origin,
  // });
  res.status(StatusCodes.CREATED);
  res.json({ message: "Đăng ký thành công!" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError(`Email không hợp lệ!`);

  const isMatchPWD = await comparePWD(password, user.password);
  if (!isMatchPWD) throw new BadRequestError(`Password không hợp lệ!`);

  if (!user.isVerified) {
    const origin = "http://localhost:4000";
    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });
    throw new UnauthenticatedError(
      "Xin vui lòng xác nhận email để có thể đăng nhập vào hệ thông!"
    );
  }

  const tokenUser = createTokenUser(user);
  let refreshToken = "";
  const existingToken = await Token.findOne({ userId: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Đăng nhập không thành công");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesResponse({ res, tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = generateToken();
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, userId: user._id };
  await Token.create(userToken);
  attachCookiesResponse({ res, tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser, userAgent, ip });
};
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError(`Email không hợp lệ`);

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Xác minh email thất bại!");
  }
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK);
  res.json({ message: "Xác minh email thành công!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Email không hợp lệ!");

  const origin = "http://localhost:3000";
  const passwordToken = generateToken();
  await sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: passwordToken,
    origin,
  });
  const tenMinutes = 60 * 1000 * 10;
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
  user.passwordToken = hashString(passwordToken);
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  res.status(StatusCodes.OK);
  res.json({
    message: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu của bạn!",
  });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email) {
    throw new BadRequestError(
      "Xin hay vui lòng cung cấp mã token(code) and email"
    );
  }
  if (password.length < 6) {
    throw new BadRequestError("Passowrd cần ít nhất là 6 kí tự");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Người dùng không tồn tại");
  }
  const currentDate = new Date(Date.now());

  if (
    user.passwordToken === (await hashString(token)) &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
    res.status(200);
    return res.json({ message: "Đặt lại mật khẩu thành công!" });
  }
  throw new UnauthenticatedError("Không có quyền đặt lại mật khẩu!");
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ userId: req.userInfo.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK);
  res.json({ message: "Đăng xuất thành công!" });
};
// entire user [testing]
module.exports = {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

/* 
get , post ,patch , getDetail ,create



*/
