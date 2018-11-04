import express from 'express';
import async from 'async';
import jwt from 'jsonwebtoken';
import {
  logger,
} from '../../../log';
import googleAuth from './googleLogin';
import facebookAuth from './facebookLogin';
import Player from '../../models/player';
import authController from './authController';
import config from '../../../config';
import { store } from '../../middleware';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     parameters:
 *       - in: body
 *         name: login credentials
 *         required: true
 *         description: for user login or signup
 *         schema:
 *           type: object
 *           properties:
 *              id_token:
 *                type: string
 *              provider:
 *                type: string
 *     tags:
 *       - auth
 *     description: Creates new player or login
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Player Logged in
 *         schema:
 *           type: object
 *           properties:
 *              success:
 *                 type: boolean
 *              data:
 *                 type: object
 *                 properties:
 *                    token:
 *                       type: string
 *       400:
 *         description: User already exists
 *       401:
 *         description: Unauthorised request
 */

router.post('/login', (req, res) => {
  const loginData = req.body;
  const tasks = [

    // Verifying token of the user
    (callback) => {
      if (loginData.provider === 'google') {
        googleAuth.verify(loginData, (err, user) => {
          if (err) {
            logger.error(err);
            return callback(err, null);
          }
          return callback(null, user);
        });
      } else if (loginData.provider === 'facebook') {
        facebookAuth.verify(loginData, (err, user) => {
          if (err) {
            logger.error(err);
            return callback(err, null);
          }
          return callback(null, user);
        });
      } else {
        return callback('provider not given', null);
      }
    },

    (user, callback) => {
      store.all((err, sessions) => {
        console.log(sessions, 'auth waale');
        if (sessions.filter(x => x.email === user.email).length) {
          console.log('here', sessions.filter(x => x.email === user.email));
          return callback('Already active', null);
        }
        console.log('here 2');
        return callback(null, user);
      });
    },

    // Checking the user in database amd further processing
    (user, callback) => {
      Player.findOne({
        email: user.email,
      }, (err, player) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (!player) {
          if (!user.email) {
            return callback('Try with another account', null);
          }
          authController.createPlayer(user, (err1, newPlayer) => {
            if (err1) {
              logger.error(err1);
              return callback(err1, null);
            }
            return callback(null, newPlayer);
          });
        } else {
          return callback(null, player);
        }
      });
    },

    // Generating the jwt token
    (user, callback) => {
      req.session.email = user.email;
      const token = jwt.sign({
        user,
      }, config.app.WEB_TOKEN_SECRET, {
        expiresIn: config.app.jwt_expiry_time,
      });

      return callback(null, token);
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger.error(err);
      res.status(401).json({
        err,
        success: false,
        singleDevice: err !== 'Already active',
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          singleDevice: true,
          token: response,
        },
      });
    }
  });
});

router.get('/logout', (req, res) => {
  console.log('------------------------------------------------', req.sessionID);
  // req.session.destroy();
  req.session = null;
  console.log('------------------------------------------------', req.sessionID);
  store.destroy(req.sessionID, (err) => {
    if (err) {
      res.json({
        success: false,
      });
    } else {
      store.all((err, sessions) => {
        console.log(sessions);
        res.json({
          success: true,
        });
      });
    }
  });
});


export default router;
