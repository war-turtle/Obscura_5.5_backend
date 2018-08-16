import express from 'express';
import {
  logger,
} from '../../../log';
import Player from '../../models/player';


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

router.get('/', (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      logger.error(err);
      res.send(err);
    } else {
      res.send(players);
    }
  });
});

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
 *           properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              username:
 *                type: string
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

router.post('/create', (req, res) => {
  const userData = new Player(req.body);
  userData.save((err, response) => {
    if (err) {
      logger.error(err);
      res.json({
        err,
        success: false,
      });
    } else {
      res.json({
        success: true,
        data: response,
      });
    }
  });
});

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
