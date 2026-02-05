import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";

const router = Router();
const articleController = new ArticleController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         title:
 *           type: string
 *           description: The title of the article
 *         content:
 *           type: string
 *           description: The content of the article
 *         author_id:
 *           type: string
 *           description: The author id
 *         published_at:
 *           type: string
 *           format: date-time
 *           description: Publication date
 *       example:
 *         id: art_123
 *         title: "10 Tips for E-commerce"
 *         content: "Content goes here..."
 *         author_id: user_123
 *         published_at: "2023-01-01T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Article management API
 */

/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     summary: Returns the list of all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: The list of the articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/", articleController.getAllArticles);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The article was not found
 */
router.get("/:id", articleController.getArticleById);

/**
 * @swagger
 * /api/v1/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: The article was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       500:
 *         description: Some server error
 */
router.post("/", articleController.createArticle);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   put:
 *     summary: Update the article by the id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: The article was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The article was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", articleController.updateArticle);

/**
 * @swagger
 * /api/v1/articles/{id}:
 *   delete:
 *     summary: Remove the article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article was deleted
 *       404:
 *         description: The article was not found
 */
router.delete("/:id", articleController.deleteArticle);

export default router;
