import express from 'express';
import players from './players';
import teams from './teams';
import levels from './levels';
import auth from './auth';

const router = express.Router();

router.use('/players', players);
router.use('/teams', teams);
router.use('/levels', levels);
router.use('/auth', auth);
