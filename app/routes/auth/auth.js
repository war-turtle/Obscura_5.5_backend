import express from 'express';
import async from 'async';
import logger from '../../../log';
import googleAuth from './googleLogin';
import facebookAuth from './facebookLogin';
import Player from '../../models/player';
import authController from './authController';

const router = express.Router();

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
      }
    },

    // Checking the user in database amd further processing
    (callback, user) => {
      Player.findOne({
        email: user.email,
      }, (err, player) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (!player) {
          authController.createPlayer(user, (err1, newPlayer) => {
            if (err1) {
              logger.error(err1);
              return callback(err1);
            }
            return callback(null, newPlayer);
          });
        } else {
          return callback(null, player);
        }
      });
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

router.post('/onBoard');

export default router;
