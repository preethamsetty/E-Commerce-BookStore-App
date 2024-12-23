const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for various features',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, specifies the token format
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // Combine multiple route files
  apis: [
    path.join(__dirname, 'swagger/user.js'),
    path.join(__dirname, 'swagger/book.js'),
    path.join(__dirname, 'swagger/cart.js'),
    path.join(__dirname, 'swagger/wishlist.js'),
    path.join(__dirname, 'swagger/order.js'),
    path.join(__dirname, 'swagger/customer.js'),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
