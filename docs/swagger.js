const components = require("./components");
const paths = require("./paths");
const tags = require("./tags");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API Thương mại điện tử",
      contact: {
        name: "Viết Tài",
        email: "viettaixca123@gmail.com",
      },
    },
    servers: [
      {
        url: "https://viettai-ecommerce-api-mongodb.vercel.app/api/v1",
        description: "Server",
      },
    ],
    paths: paths,
    tags: tags,
    components: components,
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
