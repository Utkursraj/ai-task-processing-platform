import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import Architecture3D from "../components/Architecture3D";
import { getTasks } from "../api/tasks.api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    try {
      const res = await getTasks();
      setTasks(res.items || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadTasks();

    const interval = setInterval(loadTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    running: tasks.filter((t) => t.status === "running").length,
    success: tasks.filter((t) => t.status === "success").length,
    failed: tasks.filter((t) => t.status === "failed").length,
  };

  return (
    <main className="page">
      <Navbar />

      <section className="stats">
        <div className="card stat">
          <div>Total</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="card stat">
          <div>Pending</div>
          <div className="stat-value">{stats.pending}</div>
        </div>
        <div className="card stat">
          <div>Running</div>
          <div className="stat-value">{stats.running}</div>
        </div>
        <div className="card stat">
          <div>Success</div>
          <div className="stat-value">{stats.success}</div>
        </div>
        <div className="card stat">
          <div>Failed</div>
          <div className="stat-value">{stats.failed}</div>
        </div>
      </section>

      <section className="grid dashboard-grid">
        <TaskForm onCreated={loadTasks} />

        <div className="grid">
          <TaskTable tasks={tasks} />
          <Architecture3D />
        </div>
      </section>
    </main>
  );
}