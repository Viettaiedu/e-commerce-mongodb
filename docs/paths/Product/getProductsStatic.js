const getAllProductsStatic = {
  summary: "Lấy tất cả sản phẩm tĩnh",
  tags: ["Product"],
  responses: {
    200: {
      description: "Lấy sản tất cả sản phẩm thành công",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = getAllProductsStatic;
