const createProduct = {
  summary: "Thêm sản phẩm",
  tags: ["Product"],
  requestBody: {
    description: "Thông tin sản phẩm",
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Product",
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK - Thêm sản phẩm thành công",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
    },
    400: {
      description: "BadRequest - Thông tin sản phẩm không hợp lệ.",
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = createProduct;
