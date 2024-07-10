const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VR/AR Education Platform API",
      version: "1.0.0",
      description: "API documentation for the VR/AR Education Platform",
    },
    servers: [
      {
        url: "http://localhost:8000/api", // Change this to your server's URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
