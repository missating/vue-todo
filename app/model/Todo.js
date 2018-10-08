import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TodoModel = new Schema({
  name: {
    type: String
  },

  done: {
    type: Boolean
  }
});

export default mongoose.model('Todos', TodoModel);
