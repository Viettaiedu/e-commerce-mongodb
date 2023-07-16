const forgotPassword = {
  summary: "Quên mật khẩu",
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
          email: "Your_email",
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK - Quên mật khẩu thành công",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example:
                  "Quên mật khẩu thành công, vui lòng kiểm tra email để đặt lại mật khẩu",
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
                example: "Email không hợp lệ",
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = forgotPassword;
