import { useState } from "react";

export default function App() {
  const [base, setBase] = useState(0);
  const [queue, setQueue] = useState([]);
  const [steps, setSteps] = useState([]);

  function addIncrement() {
    setQueue(prev => [...prev, (n) => n + 1]);
  }

  function addReplace() {
    const value = prompt("Enter value:");
    setQueue(prev => [...prev, Number(value)]);
  }

  function runQueue() {
    let state = base;
    const result = [];

    for (let update of queue) {
      if (typeof update === "function") {
        state = update(state);
      } else {
        state = update;
      }
      result.push(state);
    }

    setSteps(result);
  }

  return (
    <div>
      <h2>State Queue Visualizer</h2>

      <input
        type="number"
        value={base}
        onChange={(e) => setBase(Number(e.target.value))}
      />

      <div>
        <button onClick={addIncrement}>+1</button>
        <button onClick={addReplace}>Set Value</button>
        <button onClick={runQueue}>Run</button>
      </div>

      <h3>Steps:</h3>
      {steps.map((step, i) => (
        <p key={i}>Step {i + 1}: {step}</p>
      ))}
    </div>
  );
}