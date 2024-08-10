/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       id:
 *         description: Product's unique id
 *         type: string
 *         example: 400ee54e-cb86-4e4a-bf82-4d4f39446136
 *       name:
 *         description: Product's name
 *         type: string
 *         example: Car
 *       description:
 *         description: Product's description
 *         type: string
 *         example: Car's detailed description
 *       price:
 *         description: Product's price
 *         type: number
 *         example: 10.99
 *       stock:
 *         description: Product's stock level
 *         type: number
 *         example: 100
 *   count:
 *     description: Product's count
 *     type: integer
 *     example: 10
 *   customerId:
 *     description: Customer's id
 *     type: string
 *     example: 500ee54e-cb86-4e4a-bf82-4d4f39446131
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieves product list.
 *     tags: [Products]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Product list
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               example: 1
 *             itemList:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product' 
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates product
 *     tags: [Products]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Product
 *         schema:
 *           properties:
 *             name:
 *               $ref: '#/definitions/Product/properties/name'
 *             description:
 *               $ref: '#/definitions/Product/properties/description'
 *             price:
 *               $ref: '#/definitions/Product/properties/price'
 *             stock:
 *               $ref: '#/definitions/Product/properties/stock'
 *     responses:
 *       204:
 *         description: No content
 */

/**
 * @swagger
 * /products/{id}/restock:
 *   post:
 *     summary: Restocks product
 *     tags: [Products]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description:
 *           $ref: '#/definitions/Product/properties/id/description'
 *         type:
 *           $ref: '#/definitions/Product/properties/id/type'
 *       - in: body
 *         name: Product
 *         schema:
 *           properties:
 *             count:
 *               $ref: '#/definitions/count'
 *     responses:
 *       204:
 *         description: No content
 */

/**
 * @swagger
 * /products/{id}/sell:
 *   post:
 *     summary: Sells product
 *     tags: [Products]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description:
 *           $ref: '#/definitions/Product/properties/id/description'
 *         type:
 *           $ref: '#/definitions/Product/properties/id/type'
 *       - in: body
 *         name: Product
 *         schema:
 *           properties:
 *             count:
 *               $ref: '#/definitions/count'
 *     responses:
 *       204:
 *         description: No content
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Creates order
 *     tags: [Orders]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Order
 *         schema:
 *           properties:
 *             customerId:
 *               $ref: '#/definitions/customerId'
 *             itemList:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type:
 *                       $ref: '#/definitions/Product/properties/id/type'
 *                     description:
 *                       $ref: '#/definitions/Product/properties/id/description'
 *                   count:
 *                     $ref: '#/definitions/count'
 *     responses:
 *       204:
 *         description: No content
 */
