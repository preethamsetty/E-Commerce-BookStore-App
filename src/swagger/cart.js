const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
require('dotenv').config();


const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Cart API',
      version: '1.0.0',
      description: 'API for managing the cart in the application.',
    },
    servers: [
      {
        url: 'http://localhost:${process.env.APP_PORT}',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['../routes/cart.route.ts'], // Adjust path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to cart management
 */

/**
 * @swagger
 * /cart/{BookId}:
 *   post:
 *     summary: Add a book to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: BookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to add to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Book added to the cart successfully
 *       400:
 *         description: Bad Request
 *   delete:
 *     summary: Remove a book from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: BookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to remove from the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Book removed from the cart successfully
 *       400:
 *         description: Bad Request
 *   put:
 *     summary: Update book quantity in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: BookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update in the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               quantityChange:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Delete the entire cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       400:
 *         description: Bad Request
 *   get:
 *     summary: Retrieve the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       400:
 *         description: Bad Request
 */

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
