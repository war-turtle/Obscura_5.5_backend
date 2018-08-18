import express from 'express';
import jwt from 'jsonwebtoken';
import async from 'async';
import {
  logger,
} from '../../../log';
import Team from '../../models/team';
import Player from '../../models/player';
import config from '../../../config';

const router = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
 *     tags:
 *       - teams
 *     description: Returns all teams
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of teams
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/teams'
 */

router.get('/', (req, res) => {
  Team.find({}, (err, teams) => {
    if (err) {
      logger.error(err);
      res.json({
        err,
        success: false,
      });
    } else {
      res.json({
        success: true,
        data: teams,
      });
    }
  });
});

/**
 * @swagger
 * /teams/{id}:
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
 *         description: id of team
 *     tags:
 *       - teams
 *     description: Returns team with given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of a particular team
 *         schema:
 *           type: object
 *           $ref: '#/definitions/teams'
 *       404:
 *         description: team with specific id not found
 */

router.get('/:id', (req, res) => {
  Team.findById(req.params.id, (err, team) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        data: team,
      });
    }
  });
});

/**
 * @swagger
 * /teams/create:
 *   post:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
 *       - in: body
 *         name: team
 *         required: true
 *         description: the team to create
 *         schema:
 *           type: object
 *           properties:
 *              picture:
 *                type: string
 *              name:
 *                 type: string
 *     tags:
 *       - teams
 *     description: Creates new team
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: New team created
 *         schema:
 *           type: object
 *           $ref: '#/definitions/teams'
 *       400:
 *         description: team already exists
 *       401:
 *         description: Unauthorised request
 */

router.post('/create', (req, res) => {
  const teamData = req.body;
  teamData.admin_id = req.user._id;
  teamData.players = [{
    _id: req.user._id,
    name: req.user.name,
  }];

  const tasks = [
    (callback) => {
      const dbTeamData = new Team(teamData);
      dbTeamData.save((err, response) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, response);
      });
    },

    (teamDetails, callback) => {
      Player.updateOne({
        _id: req.user._id,
      }, {
        $set: { team_id: teamDetails._id },
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
      Player.findById(req.user._id, (err, player) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, player);
      });
    },
  ];

  async.waterfall(tasks, (err, playerData) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        data: {
          token: jwt.sign({
            playerData,
          }, config.app.WEB_TOKEN_SECRET, {
            expiresIn: config.app.jwt_expiry_time,
          }),
        },
      });
    }
  });
});

/**
 * @swagger
 * /teams/{id}:
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
 *         description: id of team
 *     tags:
 *       - teams
 *     description: Updates team with given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of a particular team
 *         schema:
 *           type: object
 *           $ref: '#/definitions/teams'
 *       404:
 *         description: team with specific id not found
 *       401:
 *         description: Unauthorized request
 */

router.put('/:id', (req, res) => {
  const tasks = [

    // Checking the user dont exist in another team
    (callback) => {
      Player.findById(req.user._id, (err, player) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (player.team_id) {
          return callback('Player has already joined a team', null);
        }
        return callback(null, player);
      });
    },

    (player, callback) => {
      Team.updateOne({
        _id: req.params.id,
      }, {
        $push: { requests: { requester_id: req.user._id } },
      }, (err, res) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, res);
      });
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger.error(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
      });
    }
  });
});

export default router;
