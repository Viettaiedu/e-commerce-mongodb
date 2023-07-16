const login = {
  summary: "Người dùng đăng nhập",
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
          password: "Your_password",
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success - Đăng nhập thành công",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Your_name",
                  },
                  userId: {
                    type: "string",
                    example: "Your_user_id",
                  },
                  role: {
                    type: "string",
                    example: "Your_role",
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "BadRequest - Dữ liệu vào không hợp lệ",
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
    404: {
      description: "NotFound - Không tìm thấy tài khoản của người dùng",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Email không hiện không tồn tại trong hệ thống",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthozied - Không được phép đăng nhập",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Bạn không phép đăng nhập tài khoản này",
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = login;
