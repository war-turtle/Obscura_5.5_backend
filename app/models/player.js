import mongoose from 'mongoose';

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
