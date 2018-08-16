import mongoose from 'mongoose';

/**
 * @swagger
 * definition:
 *   players:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       team_id:
 *         type: string
 *       avatar:
 *         type: string
 *       username:
 *         type: string
 *       phone:
 *         type: number
 *       created_at:
 *         type: date-time
 *       updated_at:
 *         type: date-time
 */

const PlayerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  team_id: String,

  avatar: String,

  username: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: Number,
    unique: true,
  },

  college: String,

  created_at: {
    type: Date,
    default: new Date(),
  },

  updated_at: {
    type: Date,
    default: new Date(),
  },

});

export default mongoose.model('Player', PlayerSchema);
