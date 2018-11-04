import players from './routes/players/players';
import teams from './routes/teams/teams';
import levels from './routes/levels/levels';
import auth from './routes/auth/auth';
import messages from './routes/messages/messages';
import requireAuth from './global/middlewares/ValidAuthToken';
import TimeLimiter from './global/middlewares/timeLimiter';
import SingleDevice from './global/middlewares/SingleDevice';

const router = (app) => {
  app.use('/players', requireAuth, SingleDevice, players);
  app.use('/teams', requireAuth, SingleDevice, teams);
  app.use('/levels', requireAuth, TimeLimiter, SingleDevice, levels);
  app.use('/messages', requireAuth, SingleDevice, messages);
  app.use('/auth', auth);
};

export default router;
