import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";

const router = Router();
const reviewController = new ReviewController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - user_id
 *         - product_id
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         user_id:
 *           type: string
 *           description: The user id
 *         product_id:
 *           type: string
 *           description: The product id
 *         rating:
 *           type: integer
 *           description: Rating (1-5)
 *         comment:
 *           type: string
 *           description: Review comment
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *       example:
 *         id: rev_123
 *         user_id: user_123
 *         product_id: prod_123
 *         rating: 5
 *         comment: "Great product!"
 *         created_at: "2023-01-01T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management API
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Returns the list of all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: The list of the reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/", reviewController.getAllReviews);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get the review by id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: The review description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: The review was not found
 */
router.get("/:id", reviewController.getReviewById);

/**
 * @swagger
 * /api/v1/reviews/product/{productId}:
 *   get:
 *     summary: Get reviews by product id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The list of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/product/:productId", reviewController.getProductReviews);

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Some server error
 */
router.post("/", reviewController.createReview);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update the review by the id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The review was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", reviewController.updateReview);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Remove the review by id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: The review was deleted
 *       404:
 *         description: The review was not found
 */
router.delete("/:id", reviewController.deleteReview);

export default router;
