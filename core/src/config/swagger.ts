import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Limarpoo Core API",
      version: "1.0.0",
      description: "Core Backend API for Limarpoo E-commerce platform",
      contact: {
        name: "Limarpoo Dev Team",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/server.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
