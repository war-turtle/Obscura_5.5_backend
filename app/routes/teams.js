import express from 'express';

const router = express.Router();

router.get('/');
router.get('/:id');
router.post('/create');
router.put('/:id');

export default router;
