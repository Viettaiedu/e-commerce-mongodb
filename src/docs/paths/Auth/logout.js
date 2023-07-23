const logout = {
  summary: " Đăng xuất khỏi hệ thống",
  tags: ["Auth"],
  responses: {
    200: {
      description: "OK - Đăng xuất hệ thống thành công",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                message: "Đăng xuất thành công",
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = logout;
