import express from 'express';
import {
  logger,
} from '../../../log';
import Team from '../../models/team';

const router = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
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

router.get('/:id');

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

  const dbTeamData = new Team(teamData);
  dbTeamData.save((err, response) => {
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
 * /teams/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: id of team
 *       - in: body
 *         name: team
 *         required: true
 *         description: updated team information
 *         schema:
 *           type: object
 *           $ref: '#/definitions/teams'
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

router.put('/:id');

export default router;
