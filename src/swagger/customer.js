const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
require('dotenv').config();


const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Customer Details API',
      version: '1.0.0',
      description: 'API for managing customer details.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['../routes/customerDetails.route.ts'], // Adjust path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   name: Customer Details
 *   description: Operations related to managing customer details
 */

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Add customer details
 *     tags: [Customer Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               name:
 *                 type: string
 *                 description: The name of the customer.
 *               address:
 *                 type: string
 *                 description: The address of the customer.
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the customer.
 *             required:
 *               - userId
 *               - name
 *               - address
 *               - contactNumber
 *     responses:
 *       201:
 *         description: Customer details added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Customer Details added successfully
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
 * /customer:
 *   get:
 *     summary: Get customer details
 *     tags: [Customer Details]
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose details are being retrieved.
 *     responses:
 *       200:
 *         description: Customer details retrieved successfully.
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
 *                   example: Customer details retrieved successfully
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal Server Error
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
 */

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Update customer details
 *     tags: [Customer Details]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer details to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the customer.
 *               address:
 *                 type: string
 *                 description: Updated address of the customer.
 *               contactNumber:
 *                 type: string
 *                 description: Updated contact number of the customer.
 *     responses:
 *       200:
 *         description: Customer details updated successfully.
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
 *                   example: Customer details updated successfully
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal Server Error
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
 */

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
