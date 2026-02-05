import { Router } from "express";
import { CustomerProfileController } from "../controllers/customer-profile.controller";

const router = Router();
const customerProfileController = new CustomerProfileController();

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerProfile:
 *       type: object
 *       required:
 *         - user_id
 *         - first_name
 *         - last_name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the profile
 *         user_id:
 *           type: string
 *           description: The user id
 *         first_name:
 *           type: string
 *           description: First name
 *         last_name:
 *           type: string
 *           description: Last name
 *         phone:
 *           type: string
 *           description: Phone number
 *       example:
 *         id: prof_123
 *         user_id: user_123
 *         first_name: John
 *         last_name: Doe
 *         phone: "+1234567890"
 */

/**
 * @swagger
 * tags:
 *   name: CustomerProfiles
 *   description: Customer Profile management API
 */

/**
 * @swagger
 * /api/v1/customer-profiles:
 *   get:
 *     summary: Returns the list of all customer profiles
 *     tags: [CustomerProfiles]
 *     responses:
 *       200:
 *         description: The list of the customer profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerProfile'
 */
router.get("/", customerProfileController.getAllProfiles);

/**
 * @swagger
 * /api/v1/customer-profiles/{id}:
 *   get:
 *     summary: Get the profile by id
 *     tags: [CustomerProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerProfile'
 *       404:
 *         description: The profile was not found
 */
router.get("/:id", customerProfileController.getProfileById);

/**
 * @swagger
 * /api/v1/customer-profiles/user/{userId}:
 *   get:
 *     summary: Get the profile by user id
 *     tags: [CustomerProfiles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The profile description by user id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerProfile'
 *       404:
 *         description: The profile was not found
 */
router.get("/user/:userId", customerProfileController.getProfileByUserId);

/**
 * @swagger
 * /api/v1/customer-profiles:
 *   post:
 *     summary: Create a new customer profile
 *     tags: [CustomerProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerProfile'
 *     responses:
 *       201:
 *         description: The profile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerProfile'
 *       409:
 *         description: Profile for this user already exists
 *       500:
 *         description: Some server error
 */
router.post("/", customerProfileController.createProfile);

/**
 * @swagger
 * /api/v1/customer-profiles/{id}:
 *   put:
 *     summary: Update the profile by the id
 *     tags: [CustomerProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerProfile'
 *     responses:
 *       200:
 *         description: The profile was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerProfile'
 *       404:
 *         description: The profile was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", customerProfileController.updateProfile);

/**
 * @swagger
 * /api/v1/customer-profiles/{id}:
 *   delete:
 *     summary: Remove the profile by id
 *     tags: [CustomerProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile was deleted
 *       404:
 *         description: The profile was not found
 */
router.delete("/:id", customerProfileController.deleteProfile);

export default router;
