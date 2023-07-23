const register = {
  summary: "Người dùng đăng ký",
  tags: ["Auth"],
  requestBody: {
    required: true,
    description:
      "Đăng ký tài khoản, vui lòng thử email thật để có thể xác minh email, còn nếu không bạn có thể sử dụng tài khoản này vd (email:viettaii2003@gmail.com,password:123123) đây là tài khoản admin",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Auth",
          required: true,
        },
        example: {
          name: "Your_name",
          email: "Your_email",
          password: "Your_password",
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK - Đăng ký thành công",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Đăng ký thành công",
              },
            },
          },
        },
      },
    },
    400: {
      description: "BadRequest - Dữ liệu đầu vào không hợp lệ",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: ["Email đã tồn tại", "Password tối thiểu 6 kí tự"],
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = register;
