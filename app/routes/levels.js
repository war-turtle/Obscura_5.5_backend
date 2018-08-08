import express from 'express';

const router = express.Router();

router.get('/');
router.get('/:id');
router.post('/create');
router.put('/:id');
router.post('/:id');

export default router;
