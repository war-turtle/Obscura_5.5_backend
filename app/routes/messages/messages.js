import express from 'express';
import messageController from './messageController';

const router = express.Router();

router.post('/', (req, res) => {
  if (req.query.action === 'email') {
    messageController.sendEmail(req.user, req.body, (err, info) => {
      if (err) {
        res.json({
          success: false,
        });
      } else {
        res.json({
          success: true,
        });
      }
    });
  }
});

export default router;
