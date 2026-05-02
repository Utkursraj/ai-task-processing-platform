import { useState } from "react";
import { createTask } from "../api/tasks.api";

export default function TaskForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    inputText: "",
    operation: "uppercase",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createTask(form);
      setForm({ title: "", inputText: "", operation: "uppercase" });
      onCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card section">
      <h2>Create Task</h2>
      <p className="muted">Submit text processing jobs into the queue.</p>

      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}

        <input
          className="input"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="textarea"
          placeholder="Input text"
          value={form.inputText}
          onChange={(e) => setForm({ ...form, inputText: e.target.value })}
        />

        <select
          className="select"
          value={form.operation}
          onChange={(e) => setForm({ ...form, operation: e.target.value })}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="reverse">Reverse</option>
          <option value="word_count">Word Count</option>
        </select>

        <button className="button" disabled={loading}>
          {loading ? "Submitting..." : "Create Task"}
        </button>
      </form>
    </section>
  );
}