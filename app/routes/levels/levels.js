import express from 'express';
import {
  logger,
} from '../../../log';
import Level from '../../models/level';

const router = express.Router();

/**
 * @swagger
 * /levels:
 *   get:
 *     tags:
 *       - levels
 *     description: Returns all levels
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of levels
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/levels'
 */

router.get('/', (req, res) => {
  Level.find({}, (err, levels) => {
    if (err) {
      logger.error(err);
      res.json({
        err,
        success: false,
      });
    } else {
      res.json({
        success: true,
        data: levels,
      });
    }
  });
});

/**
 * @swagger
 * /levels/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: id of level
 *     tags:
 *       - levels
 *     description: Returns level with given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of a particular level
 *         schema:
 *           type: object
 *           $ref: '#/definitions/levels'
 *       404:
 *         description: level with specific id not found
 */

router.get('/:id');

/**
 * @swagger
 * /levels/create:
 *   post:
 *     parameters:
 *       - in: body
 *         name: level
 *         required: true
 *         description: the level to create
 *         schema:
 *           type: object
 *           properties:
 *              level_no:
 *                  type: number
 *     tags:
 *       - levels
 *     description: Creates new level
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: New level created
 *         schema:
 *           type: object
 *           $ref: '#/definitions/levels'
 *       400:
 *         description: level already exists
 *       401:
 *         description: Unauthorised request
 */

router.post('/create', (req, res) => {
  const levelData = new Level(req.body);
  levelData.save((err, response) => {
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
 * /levels/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: id of level
 *       - in: body
 *         name: level
 *         required: true
 *         description: updated level information
 *         schema:
 *           type: object
 *           $ref: '#/definitions/levels'
 *     tags:
 *       - levels
 *     description: Updates level with given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Object of a particular level
 *         schema:
 *           type: object
 *           $ref: '#/definitions/levels'
 *       404:
 *         description: level with specific id not found
 *       401:
 *         description: Unauthorized request
 */

router.put('/:id', (req, res) => {});

/**
 * @swagger
 * /levels/{id}:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: id of level
 *       - in: body
 *         name: answer
 *         required: true
 *         description: answer of user
 *         type: string
 *     tags:
 *       - levels
 *     description: Checks answer for given level
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Answer is correct
 *       400:
 *         description: Answer is wrong
 *       404:
 *         description: level with specific id not found
 *       401:
 *         description: Unauthorized request
 */

router.post('/:id');

export default router;
