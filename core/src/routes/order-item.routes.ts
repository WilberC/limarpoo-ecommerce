import { Router } from "express";
import { OrderItemController } from "../controllers/order-item.controller";

const router = Router();
const orderItemController = new OrderItemController();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - order_id
 *         - product_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order item
 *         order_id:
 *           type: string
 *           description: The order id
 *         product_id:
 *           type: string
 *           description: The product id
 *         quantity:
 *           type: integer
 *           description: Quantity
 *         unit_price:
 *           type: number
 *           format: float
 *           description: Price per unit
 *         total_price:
 *           type: number
 *           format: float
 *           description: Total price (quantity * unit_price)
 *       example:
 *         id: item_123
 *         order_id: ord_123
 *         product_id: prod_123
 *         quantity: 2
 *         unit_price: 50.00
 *         total_price: 100.00
 */

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Order Item management API
 */

/**
 * @swagger
 * /api/v1/order-items:
 *   get:
 *     summary: Returns the list of all order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: The list of the order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 */
router.get("/", orderItemController.getAllOrderItems);

/**
 * @swagger
 * /api/v1/order-items/{id}:
 *   get:
 *     summary: Get the order item by id
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order item id
 *     responses:
 *       200:
 *         description: The order item description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: The order item was not found
 */
router.get("/:id", orderItemController.getOrderItemById);

/**
 * @swagger
 * /api/v1/order-items/order/{orderId}:
 *   get:
 *     summary: Get order items by order id
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The list of items for the order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 */
router.get("/order/:orderId", orderItemController.getOrderItemsByOrderId);

/**
 * @swagger
 * /api/v1/order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: The order item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       500:
 *         description: Some server error
 */
router.post("/", orderItemController.createOrderItem);

/**
 * @swagger
 * /api/v1/order-items/{id}:
 *   put:
 *     summary: Update the order item by the id
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       200:
 *         description: The order item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: The order item was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", orderItemController.updateOrderItem);

/**
 * @swagger
 * /api/v1/order-items/{id}:
 *   delete:
 *     summary: Remove the order item by id
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order item id
 *     responses:
 *       200:
 *         description: The order item was deleted
 *       404:
 *         description: The order item was not found
 */
router.delete("/:id", orderItemController.deleteOrderItem);

export default router;
