import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user_id
 *         - shipping_address_id
 *         - items
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         user_id:
 *           type: string
 *           description: The id of the user who placed the order
 *         shipping_address_id:
 *           type: string
 *           description: The id of the shipping address
 *         total_amount:
 *           type: number
 *           format: float
 *           description: The total amount of the order
 *         status:
 *           type: string
 *           enum: [PENDING, PAID, SHIPPED, DELIVERED, CANCELLED]
 *           description: The status of the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *       example:
 *         id: d5fE_asz
 *         user_id: user_123
 *         shipping_address_id: addr_123
 *         total_amount: 100.00
 *         status: PENDING
 *         items:
 *           - product_id: prod_123
 *             quantity: 2
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Returns the list of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 */
router.get("/:id", orderController.getOrderById);

/**
 * @swagger
 * /api/v1/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of orders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/user/:userId", orderController.getUserOrders);

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */
router.post("/", orderController.createOrder);

export default router;
