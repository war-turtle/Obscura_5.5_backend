import express from 'express';

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

router.get('/');

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
 *           $ref: '#/definitions/levels'
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

router.post('/create');

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

router.put('/:id');

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
