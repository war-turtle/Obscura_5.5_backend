import mongoose from 'mongoose';

/**
 * @swagger
 * definition:
 *   players:
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       email:
 *         type: string
 *         required: true
 *         unique: true
 *       team_id:
 *         type: string
 *       avatar:
 *         type: array
 *       username:
 *         type: string
 *         required: true
 *         unique: true
 *       phone:
 *         type: string
 *         required: true
 *         unique: true
 *       created_at:
 *         type: date
 *       updated_at:
 *         type: date
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

  avatar: [{
    type: String,
  }],

  username: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: Number,
    unique: true,
    required: true,
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
