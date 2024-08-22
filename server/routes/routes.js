const express = require("express");
const router = express.Router();

const ControllerUser = require("../controllers/ControllerUser");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.route("/").get((req, res) => res.send("Hangout AI Server"));

/**
 * @swagger
 * /social-login:
 *   post:
 *     summary: Login with social media
 *     description: Login with social media account (Google)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Update chat successfully
 *       '401':
 *         description: Invalid user
 */
router.route("/social-login").post(ControllerUser.socialLogin);

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate itenaries
 *     description: Generate itenaries with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *               address:
 *                 type: string
 *               latlng:
 *                 type: object
 *                 properties:
 *                  lat:
 *                      type: number     
 *                  lng:
 *                      type: number     
 *     responses:
 *       '201':
 *         description: Update chat successfully
 *       '401':
 *         description: Invalid user
 */
router.route("/generate").post(authentication, ControllerUser.generate);

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats
 *     description: Get all chats
 *     responses:
 *       '200':
 *         description: Get all chats
 */
router.route("/chats").get(authentication, ControllerUser.listOfChat);

/**
 * @swagger
 * /chats/:id:
 *   get:
 *     summary: Get detail chat
 *     description: Get detail chat
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: chat ID
 *     responses:
 *       '200':
 *         description: Get detail chat
 */
router.route("/chats/:id").get(authentication, ControllerUser.getChatId);


/**
 * @swagger
 * /chats/:id:
 *   post:
 *     summary: Update chat
 *     description: Update chat id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: object
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: chat ID
 *     responses:
 *       '201':
 *         description: Update chat successfully
 *       '400':
 *         description: Bad request
 */
router.route("/chats/:id").post(authentication, authorization, ControllerUser.updateChatId);

module.exports = router
