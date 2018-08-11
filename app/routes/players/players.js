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

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: id of player
 *     tags:
 *       - player
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

/**
 * @swagger
 * /players/{id}:
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
 *       - player
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
router.get('/');
router.get('/:id');
router.post('/create');
router.put('/:id');

export default router;
