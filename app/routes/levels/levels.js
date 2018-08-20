import express from 'express';
import async from 'async';
import {
  logger,
} from '../../../log';
import Level from '../../models/level';
import levelController from './levelController';

const router = express.Router();

/**
 * @swagger
 * /levels:
 *   get:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
 *       - in: query
 *         name: alias
 *         type: string
 *         description: alias of level
 *       - in: query
 *         name: action
 *         type: string
 *         required: true
 *         description: alias of level
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
  const task1 = [
    (callback) => {
      levelController.getCurrentLevel(req.user, req.query.alias, (err, level) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, level);
      });
    },
  ];

  const task2 = [

  ];

  const taskDecider = (action) => {
    switch (action) {
      case 'getCurrentLevel':
        return task1;
      case 'getAllLevels':
        return task2;
      default:
        return null;
    }
  };

  async.waterfall(taskDecider(req.query.action), (err, response) => {
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

router.get('/:id', (req, res) => {
  const levelId = req.params.id;
  Level.findById(levelId, (err, level) => {
    if (err) {
      logger.error(err);
      res.json({
        err,
        success: false,
      });
    } else {
      res.json({
        success: true,
        data: level,
      });
    }
  });
});

/**
 * @swagger
 * /levels:
 *   post:
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
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

router.post('/', (req, res) => {
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
 *       - in: header
 *         name: authorization
 *         required: true
 *         type: string
 *         description: JWT Token
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
 *           properties:
 *              sub_level_no:
 *                type: number
 *              url_alias:
 *                type: string
 *              picture:
 *                type: array
 *                items:
 *                    type: string
 *              ans:
 *                type: array
 *                items:
 *                    type: string
 *              js:
 *                type: string
 *              html:
 *                type: string
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

router.put('/:id', (req, res) => {
  Level.updateOne({
    _id: req.params.id,
  }, {
    $push: {
      sub_levels: req.body,
    },
  }, (err, res1) => {
    if (err) {
      logger.error(err);
      res.json({
        err,
        success: false,
      });
    } else {
      res.json({
        success: true,
        data: res1,
      });
    }
  });
});

/**
 * @swagger
 * /levels/{id}:
 *   post:
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

router.post('/:id', (req, res) => {
  const tasks = [


    (callback) => {

    },
  ];

  async.waterfall(tasks, (err, response) => {
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

export default router;
