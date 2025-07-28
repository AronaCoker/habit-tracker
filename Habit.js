import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  createdAt: { type: Date, default: Date.now }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
