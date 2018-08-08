import players from './routes/players/players';
import teams from './routes/teams/teams';
import levels from './routes/levels/levels';
import auth from './routes/auth/auth';

/**
 * @swagger
 * definition:
 *   users:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/users'
 */

const router = (app) => {
  app.use('/players', players);
  app.use('/teams', teams);
  app.use('/levels', levels);
  app.use('/auth', auth);
};

export default router;
