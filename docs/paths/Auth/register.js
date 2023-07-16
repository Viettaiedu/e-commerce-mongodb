const register = {
  summary: "Người dùng đăng ký",
  tags: ["Auth"],
  requestBody: {
    required: true,
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
