import jwt from 'jsonwebtoken';
import ResponseTemplate from '../templates/response';
import configServer from '../../../config';
import Player from '../../models/player';

const ValidAuthToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, configServer.WEB_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        res.json(ResponseTemplate.authError());
      } else {
        Player.findById(decodedUser.id, (error, user) => {
          if (error) {
            res.json(ResponseTemplate.authError());
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.json(ResponseTemplate.authError());
  }
};


export default ValidAuthToken;
