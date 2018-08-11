import mongoose from 'mongoose';

/**
 * @swagger
 * definition:
 *   admin:
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 */

const AdminSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Admin', AdminSchema);
