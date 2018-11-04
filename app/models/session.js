import mongoose from 'mongoose';


const SessionSchema = mongoose.Schema({

  _id: String,

  session: String,

  expires: {
    type: Date,
  },

});

export default mongoose.model('Session', SessionSchema);
