const getAllProducts = {
  summary: "Lấy tất cả sản phẩm động",
  tags: ["Product"],
  parameters: [
    {
      name: "name",
      in: "query",
      description: "Tên của sản phẩm",
      schema: {
        type: "string",
      },
    },
    {
      name: "category",
      in: "query",
      description: "Loại của sản phẩm",
      schema: {
        type: "string",
        enum: ["office", "kitchen", "bedroom"],
      },
    },
    {
      name: "numericFilters",
      in: "query",
      description: "Tìm kiếm theo giá, đánh giá, số lượng review",
      schema: {
        type: "string",
        enum: ["price<100", "price<100,averageRating>1"],
      },
    },
    {
      name: "company",
      in: "query",
      description: "Tìm kiếm theo công ty",
      schema: {
        type: "string",
        enum: ["ikea", "liddy", "marcos"],
      },
    },
    {
      name: "featured",
      in: "query",
      description: "Tìm kiếm sản phẩm nổi bật",
      schema: {
        type: "string",
        enum: ["false", "true"],
      },
    },
    {
      name: "freeShipping",
      in: "query",
      description: "Miễn phí giao hàng",
      schema: {
        type: "string",
        enum: ["false", "true"],
      },
    },
    {
      name: "createdByUser",
      in: "query",
      description: "Tìm kiếm theo người tạo sản phẩm",
      schema: {
        type: "string",
      },
    },
    {
      name: "sort",
      in: "query",
      description: `Lọc thông tin (giảm dần, tăng dần)
      VD 1: price
      VD 2: -price
      VD 3: price,-name`,
      schema: {
        type: "string",
      },
    },
    {
      name: "page",
      in: "query",
      description: `Tìm kiếm theo trang sản phẩm`,
      schema: {
        type: "number",
        example: 1,
      },
    },
    {
      name: "limit",
      in: "query",
      description: `Sô sản phẩm có thể hiện trong 1 trang`,
      schema: {
        type: "number",
        example: 4,
      },
    },
  ],
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

module.exports = getAllProducts;
