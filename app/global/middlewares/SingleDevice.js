import Session from '../../models/session';

const SingleDevice = (req, res, next) => {
  global.store.all((err, sessions) => {
    const sess = sessions.filter(x => x.email === req.user.email);
    if (sess.length) {
      if (sess[0]._sessionid === req.sessionID) {
        next();
      } else {
        console.log('i am stopped :P');
        if (req.session) {
          // req.session.destroy();
          req.session = null;
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
