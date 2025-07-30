
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
  // 1. Validierung – haben wir gerade gemacht!
  if (!habitName.trim() || !frequency.trim()) {
    alert("Bitte trage sowohl ein Habit als auch eine Häufigkeit ein.");
    return;
  }

    const newHabit = {
    name: habitName,
    frequency: frequency,
  };



    try {
    // 3. POST-Anfrage an dein Backend
    const response = await fetch("http://localhost:5000/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHabit),
    });

      if (!response.ok) {
      throw new Error("Fehler beim Speichern des Habits");
    }

         const savedHabit = await response.json();

    // 5. UI updaten – neuen Habit zur Liste hinzufügen
    setHabits((prevHabits) => [...prevHabits, savedHabit]);

    // 6. Input-Felder leeren
    setHabitName("");
    setFrequency("");
  } catch (error) {
    console.error("Fehler beim Speichern:", error.message);
    alert("Etwas ist schief gelaufen!");
  }
};


  return (
    <div>
      <h1>Habit Tracker</h1>

      <input
  value={habitName}
  onChange={(e) => setHabitName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleAddHabit();
    }
  }}
  placeholder="Neues Habit..."
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
