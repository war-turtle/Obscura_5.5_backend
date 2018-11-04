import express from 'express';
import jwt from 'jsonwebtoken';
import async from 'async';
import {
  logger,
} from '../../../log';
import Player from '../../models/player';
import config from '../../../config';
import AdminChecker from '../../global/middlewares/adminChecker';


const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
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

router.get('/', AdminChecker, (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      logger.error(err);
      res.status(404).send(err);
    } else {
      res.status(200).json({
        success: true,
        data: players,
      });
    }
  });
});

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
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

router.get('/:id', (req, res) => {
  const userId = req.user._id;
  if (userId === req.params.id) {
    Player.findById(userId, (err, player) => {
      if (err) {
        logger.error(err);
        res.status(404).json({
          err,
          success: false,
          message: 'Player not found.',
        });
      } else {
        res.status(200).json({
          success: true,
          data: player,
        });
      }
    });
  } else {
    res.status(404).json({ // a
      success: false,
    });
  }
});

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
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
 *           properties:
 *              picture:
 *                type: string
 *              username:
 *                type: string
 *              phone:
 *                type: number
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
 *           properties:
 *              success:
 *                type: boolean
 *              data:
 *                type: object
 *                properties:
 *                    token:
 *                      type: string
 *       404:
 *         description: User with specific id not found
 *       401:
 *         description: Unauthorized request
 */
router.put('/:id', (req, res) => {
  const playerId = req.user._id;
  const data = req.body;

  const playerInfo = {
    phone: data.phone,
    username: data.username,
    college: data.college,
    onboard: true,
    picture: data.picture,
  };

  const tasks = [

    (callback) => {
      if (req.user.onboard) {
        return callback('Already onboarded', null);
      }
      return callback(null, req.user.onboard);
    },

    // updating the player details
    (condition, callback) => {
      Player.update({
        _id: playerId,
      }, {
        $set: playerInfo,
      }, (err, updatedPlayer) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, updatedPlayer);
      });
    },

    // fetching the player for making jwt token
    (data, callback) => {
      Player.findById(playerId, (err, player) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, player);
      });
    },
  ];

  if (playerId.toString() === req.params.id) {
    async.waterfall(tasks, (err, playerData) => {
      if (err) {
        logger.error(err);
        res.status(400).json({
          success: false,
          err,
          message: 'Bad Credentials',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Successfully updated!',
          data: {
            token: jwt.sign({
              user: playerData,
            }, config.app.WEB_TOKEN_SECRET, {
              expiresIn: config.app.jwt_expiry_time,
            }),
          },
        });
      }
    });
  } else {
    res.status(403).json({
      success: false,
    });
  }
});

export default router;
