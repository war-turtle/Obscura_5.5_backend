import mongoose from 'mongoose';

/**
 * @swagger
 * definition:
 *   teams:
 *     properties:
 *       id:
 *         type: string
 *       admin_id:
 *         type: string
 *       picture:
 *         type: string
 *       avatar_url:
 *         type: string
 *       players:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 */

const TeamSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  players: {
    type: [{
      id: String,
      name: String,
    }],
  },
});

export default mongoose.model('Team', TeamSchema);
