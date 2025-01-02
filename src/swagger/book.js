const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
require('dotenv').config();


const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'API for managing books.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['../routes/book.route.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *                 example: "Know yourself"
 *               author:
 *                 type: string
 *                 example: "Preetham B S"
 *               price:
 *                 type: number
 *                 example: 1560
 *               discountPrice:
 *                 type: number
 *                 example: 1000
 *               bookImage:
 *                 type: string
 *                 format: uri
 *                 example: "https://via.placeholder.com/150?text=Book+1"
 *               description:
 *                 type: string
 *                 example: "Know yourself the best than others"
 *               quantity:
 *                 type: integer
 *                 example: 30
 *               adminId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /books/sort/{page}:
 *   get:
 *     summary: Sort books by price
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: Books sorted successfully
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
 *                   example: Books sorted successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to sort books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Failed to sort books
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /books/search/{page}:
 *   get:
 *     summary: Search books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book fetched successfully
 *       400:
 *         description: Bad request
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               price:
 *                 type: number
 *                 example: 12.99
 *               description:
 *                 type: string
 *                 example: "Updated description of the book."
 *     responses:
 *       202:
 *         description: Book updated successfully
 *       400:
 *         description: Bad request
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad request
 */

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});