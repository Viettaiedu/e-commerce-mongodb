const updateProduct = {
  summary: "Cập nhật lại sản phẩm",
  tags: ["Product"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID của sản phẩm",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    description: "Dữ liệu cập nhật lại sản phẩm này",
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          name: {
            type: "string",
            example: "accent chair update",
            description: "Cập nhật tên của sản phẩm",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK - Cập nhật sản phẩm thành công",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
    },
    401: { description: "Unauthorized - Không có quyền thêm sản phẩm" },

    404: {
      description: "NotFound - Không tìm thấy sản phẩm",
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = updateProduct;
