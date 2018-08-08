import jwt from 'jsonwebtoken';
import Service from 'app/helper/Service';
import ResponseTemplate from 'app/global/templates/response';
import configServer from '../../config/server';

const ValidAuthToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    console.log(token);
    jwt.verify(token, configServer.WEB_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        res.json(ResponseTemplate.authError());
      } else {
        Service.user.findById(decodedUser.id, (error, user) => {
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
