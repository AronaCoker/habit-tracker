
import { useEffect, useState } from 'react';

function App() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/habits');
        const data = await response.json();
        setHabits(data); // speichert die Habits in den State
      } catch (error) {
        console.error('Fehler beim Laden der Habits:', error);
      }
    };

    fetchHabits(); // sofort ausführen
  }, []);


  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/habits');
        const data = await response.json();
        setHabits(data); // speichert die Habits in den State
      } catch (error) {
        console.error('Fehler beim Laden der Habits:', error);
      }
    };

    fetchHabits(); // sofort ausführen
  }, []);



  const handleAddHabit = async () => {
    if (!habitName.trim()) {
      alert('Bitte trage ein Habit ein.');
      return;
    }

    const newHabit = { habitName, frequency };



    try {
      const res = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHabit),
      });

      if (!res.ok) throw new Error('Fehler beim Speichern');

      const savedHabit = await res.json();
      setHabits([...habits, savedHabit]);  // neuen Habit an Liste anhängen
      setHabitName('');      // Eingabefeld zurücksetzen
      setFrequency('daily');  // Dropdown zurücksetzen
    } catch (error) {
      alert('Fehler: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Meine Habits</h1>

      <input
        type="text"
        placeholder="Name des Habits"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />

      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <button onClick={handleAddHabit} disabled={loading} > {loading ? 'Speichert... ' : 'Neues Habit hinzufügen'}</button>

      <ul>
        {habits.map(habit => (
          <li key={habit._id}>{habit.name} - {habit.frequency}</li>
        ))}
      </ul>
    </div>
  );
}




export default App
