import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const router = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - order_id
 *         - provider
 *         - transaction_id
 *         - amount
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the payment
 *         order_id:
 *           type: string
 *           description: The id of the order
 *         provider:
 *           type: string
 *           enum: [STRIPE, PAYPAL]
 *           description: The payment provider
 *         transaction_id:
 *           type: string
 *           description: The transaction id from the provider
 *         status:
 *           type: string
 *           description: The status of the payment
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount of the payment
 *       example:
 *         id: pay_123
 *         order_id: d5fE_asz
 *         provider: STRIPE
 *         transaction_id: txn_123456
 *         status: COMPLETED
 *         amount: 100.00
 */

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management API
 */

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: The payment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request (e.g. order not found or already paid)
 *       500:
 *         description: Some server error
 */
router.post("/", paymentController.createPayment);

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Get the payment by id
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment id
 *     responses:
 *       200:
 *         description: The payment description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: The payment was not found
 */
router.get("/:id", paymentController.getPaymentById);

export default router;
