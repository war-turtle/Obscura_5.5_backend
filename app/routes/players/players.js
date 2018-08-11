import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     tags:
 *       - players
 *     description: Returns all players
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of players
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/players'
 */

router.get('/');

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: id of player
 *     tags:
 *       - players
 *     description: Returns player with given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of a particular player
 *         schema:
 *           type: object
 *           $ref: '#/definitions/players'
 *       404:
 *         description: User with specific id not found
 */

router.get('/:id');

/**
 * @swagger
 * /players/create:
 *   post:
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: the user to create
 *         schema:
 *           type: object
 *           $ref: '#/definitions/players'
 *     tags:
 *       - players
 *     description: Creates new player
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: New player created
 *         schema:
 *           type: object
 *           $ref: '#/definitions/players'
 *       400:
 *         description: User already exists
 *       401:
 *         description: Unauthorised request
 */

router.post('/create');

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: id of player
 *       - in: body
 *         name: user
 *         required: true
 *         description: updated user information
 *         schema:
 *           type: object
 *           $ref: '#/definitions/players'
 *     tags:
 *       - players
 *     description: Updates player with given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of a particular player
 *         schema:
 *           type: object
 *           $ref: '#/definitions/players'
 *       404:
 *         description: User with specific id not found
 *       401:
 *         description: Unauthorized request
 */
router.put('/:id');

export default router;
