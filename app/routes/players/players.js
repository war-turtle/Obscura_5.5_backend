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
router.get('/:id');
router.post('/create');
router.put('/:id');

export default router;
