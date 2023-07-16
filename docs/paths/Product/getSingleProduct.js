const getSingleProduct = {
  summary: "Lấy 1 sản phẩm chi tiết",
  tags: ["Product"],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "ID của sản phẩm",
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "OK - Lấy sản phẩm chi tiết thành công",
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
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Không tìm thấy sản phẩm với id ",
              },
            },
          },
        },
      },
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = getSingleProduct;
