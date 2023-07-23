const deleteProduct = {
  summary: "Xóa sản phẩm",
  tags: ["Product"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID của sản phẩm cần xóa",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "OK - xóa sản phẩm thành công",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
    },
    404: {
      description: "NotFound - Không tìm thấy sản phẩm",
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = deleteProduct;
