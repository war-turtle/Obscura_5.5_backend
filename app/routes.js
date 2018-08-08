import players from './routes/players/players';
import teams from './routes/teams/teams';
import levels from './routes/levels/levels';
import auth from './routes/auth/auth';

const router = (app) => {
  app.use('/players', players);
  app.use('/teams', teams);
  app.use('/levels', levels);
  app.use('/auth', auth);
};

export default router;
