module.exports = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    id: {
      type: "string",
      description: "ID của người dùng",
    },
    name: {
      type: "string",
      description: "Tên hiển thị của người dùng",
    },
    email: {
      type: "string",
      description: "Email của người dùng",
    },
    password: {
      type: "string",
      description: "Mật khẩu của người dùng",
    },
    role: {
      type: "string",
      description: "Quyền của người dùng",
    },
  },
};
