 import mongoose from 'mongoose';

 const ChatSchema = mongoose.Schema({
    id: {
        type: String,
    },
    messages: [{
        sender: { type: String },
        message: { type: String },
    }]
 });

 export default mongoose.model('Chat', ChatSchema);