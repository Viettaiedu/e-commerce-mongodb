const uploadImageProduct = {
  summary: "Cập nhật ảnh cho sản phẩm",
  tags: ["Product"],
  consumes: ["multipart/form-data"],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID của sản phẩm cần cập nhật ảnh",
      required: true,
      schema: { type: "string" },
    },
    {
      name: "file",
      in: "formData",
      description: "Ảnh của sản phẩm",
      required: true,
      schema: {
        type: "file",
      },
    },
  ],
  responses: {
    200: {
      description: "OK - Cập nhật ảnh sản phẩm thành công",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
    },
    401: { description: "Unauthorized - Không có quyền thêm ảnh sản phẩm" },
    404: {
      description: "NotFound - Không tìm thấy sản phẩm",
    },
    500: { description: "INTERNAL_SERVER_ERROR - Lỗi máy chủ" },
  },
};

module.exports = uploadImageProduct;
