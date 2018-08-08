import express from 'express';
import players from './players/players';
import teams from './teams/teams';
import levels from './levels/levels';
import auth from './auth/auth';

const router = express.Router();

router.use('/players', players);
router.use('/teams', teams);
router.use('/levels', levels);
router.use('/auth', auth);

export default router;
