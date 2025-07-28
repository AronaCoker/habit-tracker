import Habit from '../models/Habit.js';

// @desc    Alle Habits abrufen
// @route   GET /api/habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Neues Habit erstellen
// @route   POST /api/habits
export const createHabit = async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Habit aktualisieren
// @route   PUT /api/habits/:id
export const updateHabit = async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Habit löschen
// @route   DELETE /api/habits/:id
export const deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
