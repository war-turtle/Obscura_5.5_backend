import configServer from '../../../config';

const TimeLimiter = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else if (configServer.startTimestamp > new Date()) {
    res.status(400).json({
      success: false,
      message: 'Game has not started yet',
    });
  } else {
    next();
  }
};


export default TimeLimiter;
