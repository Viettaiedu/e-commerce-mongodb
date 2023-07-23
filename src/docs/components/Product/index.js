module.exports = {
  type: "object",
  required: ["name", "price", "image", "company", "createdByUser"],
  properties: {
    id: {
      type: "string",
      description: "ID của sản phẩm",
    },
    name: {
      type: "string",
      description: "Tên của sản phẩm",
    },
    price: {
      type: "number",
      description: "Giá của sản phẩm",
    },
    description: {
      type: "string",
      description: "Mô tả sản phẩm",
    },
    image: {
      type: "string",
      description: "Ảnh sản phẩm",
    },
    category: {
      type: "string",
      description: "Loại của sản phẩm",
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: "string",
      description: "Công ty cấp sản phẩm",
      enum: ["ikea", "liddy", "marcos"],
    },
    colors: {
      type: "string",
      description: "Màu sản phẩm",
    },
    featured: {
      type: "boolean",
      description: "Sản phẩm nổi bật",
    },
    freeShipping: {
      type: "boolean",
      description: "Có phí ship không?",
    },
    inventory: {
      type: "number",
      description: "Số lượng hàng tồn kho",
    },
    averageRating: {
      type: "number",
      description: "Đánh giá trung bình",
    },
    numOfReviews: {
      type: "number",
      description: "Tổng số review",
    },
    createdByUser: {
      type: "string",
      description: "Người thêm sản phẩm này",
    },
  },
  example: {
    name: "accent chair vd",
    price: 25999,
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    image:
      "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
    category: "office",
    company: "marcos",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    featured: false,
    freeShipping: false,
    inventory: 15,
    averageRating: 0,
    numOfReviews: 0,
  },
};
