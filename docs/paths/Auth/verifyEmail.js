const verifyEmail = {
  summary: "Xác minh email đăng nhập vào hệ thống",
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
          verificationToken: "Your_code",
          email: "Your_email",
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK - Xác minh tài khoản thành công",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Xác minh tài khoản thành công",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized - Không được phép xác minh tài khoản",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Bạn không có quyền xác minh tài khoản này",
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = verifyEmail;
