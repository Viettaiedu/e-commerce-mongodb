const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { attachCookiesResponse } = require("../utils/jwt");
const createTokenUser = require("../utils/createTokenUser");
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users, nbHits: users.length });
};
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) throw new NotFoundError(`Không tìm thấy người dùng với id ${userId}`);
  res.status(StatusCodes.OK).json({ user });
};
// const updateUser = async (req, res) => {
//   const {
//     body: { email, name },
//     userInfo: { userId },
//   } = req;
//   if (!email || !name) {
//     throw new BadRequestError("Vui lòng cung cấp đầy đủ thông tin!");
//   }
//   const user = await User.findOne({ _id: userId }).select("-password");
//   const isExstingEmail = await User.findOne({ email });
//   if (isExstingEmail) {
//     if (isExstingEmail.email === email) {
//       throw new BadRequestError("new email same as old email");
//     }
//     throw new BadRequestError("Email already in use");
//   }
//   user.email = email;
//   user.name = name;
//   await user.save();
//   const tokenUser = createTokenUser(user);
//   attachCookiesResponse({ res, tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
const updateUserPassword = async (req, res) => {
  const {
    body: { newPassword, oldPassword },
    userInfo: { userId },
  } = req;
  if (!newPassword || !oldPassword) {
    throw new BadRequestError("Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.");
  }
  const user = await User.findOne({ _id: userId });
  const isMatch = await user.comparePWD(oldPassword);
  if (!isMatch) {
    throw new UnauthenticatedError("Thông tin không hợp lệ!");
  }
  const isSamePW = await user.comparePWD(newPassword);
  if (isSamePW) {
    throw new BadRequestError("Password cũ giống Password mới, vui lòng cung cấp lại!");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Đặt lại mật khẩu thành công." });
};

const showCurrentUser = async (req, res) => {
  const { userId } = req.userInfo;
  const user = await User.findOne({ _id: userId }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

// entire user [testing]
module.exports = {
  getAllUsers,
  getSingleUser,
  // updateUser,
  updateUserPassword,
  showCurrentUser,
};
