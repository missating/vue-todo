import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String },
  done: { type: Boolean, required: true }
});

export default mongoose.model('Todo', todoSchema);
