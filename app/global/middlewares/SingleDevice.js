import Sessions from '../../models/session';


const SingleDevice = (req, res, next) => {
  Sessions.find({}, (error, sessions) => {
    const string = `{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"email":"${req.user.email}"}`;
    const sess = sessions.filter(x => x.session === string);
    // console.log(sess, sessions);
    if (sess.length > 1) {
      if (sess[0]._sessionid === req.sessionID) {
        console.log(sess[0]._sessionid === req.sessionID, sess[0]._sessionid, req.sessionID);
        next();
      } else {
        console.log('i am stopped :P');
        if (req.session) {
          req.session.destroy();
        }
        res.status(403).json({
          success: false,
          err: 'Already active',
          singleDevice: false,
        });
      }
    } else {
      req.session.email = req.user.email;
      next();
    }
  });
};


export default SingleDevice;
