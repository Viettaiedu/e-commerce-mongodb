const resetPassword = {
  summary: "Đặt lại mật khẩu",
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
          token: "your_code",
          email: "Your_email",
          password: "Your_new_password",
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK - Đặt lại mật khẩu thành công",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Đặt mật lại mật khẩu thành công",
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
                example: ["token không hợp lệ", "email không hợp lệ"],
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = resetPassword;
