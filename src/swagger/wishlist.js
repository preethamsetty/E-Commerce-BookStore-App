const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Wishlist API',
      version: '1.0.0',
      description: 'API for managing user wishlists.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['../routes/wishlist.routes.ts'], // Adjust path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Operations related to wishlist management
 */

/**
 * @swagger
 * /wishlist/{BookId}:
 *   post:
 *     summary: Add a book to the wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: BookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to add
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user adding the book
 *     responses:
 *       200:
 *         description: Book successfully added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Book added to wishlist successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *   delete:
 *     summary: Remove a book from the wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: BookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to remove
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user removing the book
 *     responses:
 *       200:
 *         description: Book successfully removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Book removed from wishlist successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose wishlist is being retrieved
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Wishlist retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 */

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});
