import { Router } from "express";
import { AddressController } from "../controllers/address.controller";

const router = Router();
const addressController = new AddressController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - user_id
 *         - street
 *         - city
 *         - country
 *         - zip_code
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the address
 *         user_id:
 *           type: string
 *           description: The user id owner of the address
 *         street:
 *           type: string
 *           description: Street address
 *         city:
 *           type: string
 *           description: City
 *         country:
 *           type: string
 *           description: Country
 *         zip_code:
 *           type: string
 *           description: Zip Code
 *         is_default:
 *           type: boolean
 *           description: Is default address
 *       example:
 *         id: addr_123
 *         user_id: user_123
 *         street: 123 Main St
 *         city: New York
 *         country: USA
 *         zip_code: 10001
 *         is_default: true
 */

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management API
 */

/**
 * @swagger
 * /api/v1/addresses:
 *   get:
 *     summary: Returns the list of all addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: The list of the addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
router.get("/", addressController.getAllAddresses);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   get:
 *     summary: Get the address by id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: The address was not found
 */
router.get("/:id", addressController.getAddressById);

/**
 * @swagger
 * /api/v1/addresses/user/{userId}:
 *   get:
 *     summary: Get addresses by user id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of addresses for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
router.get("/user/:userId", addressController.getUserAddresses);

/**
 * @swagger
 * /api/v1/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       500:
 *         description: Some server error
 */
router.post("/", addressController.createAddress);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   put:
 *     summary: Update the address by the id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The address was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: The address was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", addressController.updateAddress);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   delete:
 *     summary: Remove the address by id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address was deleted
 *       404:
 *         description: The address was not found
 */
router.delete("/:id", addressController.deleteAddress);

export default router;
