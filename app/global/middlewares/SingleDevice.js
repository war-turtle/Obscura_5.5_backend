const SingleDevice = (req, res, next) => {
  // global.store.all((error, sessions) => {
  //   console.log(sessions);
  //   console.log(req.user);
  //   if (error) {
  //     console.log('some error =====================');
  //   } else {
  //     const allUserSessions = sessions.filter(session => session.email === req.session.email);

  //     console.log('=========================', allUserSessions);
  //     if (allUserSessions.length == 0) {
  //       req.session.email = req.user.email;
  //     } else if (allUserSessions.length > 1) {
  //       req.session.destroy((err) => {
  //         // res.status(403).json({
  //         //   success: false,
  //         //   err: 'Already active',
  //         //   singleDevice: false,
  //         // });
  //         console.log('===============================');
  //         res.status(401).json({
  //           success: false,
  //           err: 'Already active',
  //           SingleDevice: false,
  //         });
  //       });
  //     } else {
  //       next();
  //     }
  //   }
  // });
  next();
  // global.store.all((err, sessions) => {
  //   const sess = sessions.filter(x => x.email === req.user.email);
  //   if (sess.length > 1){
  //     if (sess[0]._sessionid === req.sessionID) {
  //       next();
  //     } else {
  //       console.log('i am stopped :P');
  //       if (req.session) {
  //         req.session.destroy();
  //       }
  //       res.status(403).json({
  //         success: false,
  //         err: 'Already active',
  //         singleDevice: false,
  //       });
  //     }
  //   }
  // });
};


export default SingleDevice;
