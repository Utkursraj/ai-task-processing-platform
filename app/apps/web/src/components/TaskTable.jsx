import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TaskTable({ tasks }) {
  return (
    <section className="card section">
      <h2>Tasks</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Operation</th>
            <th>Status</th>
            <th>Result</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.operation}</td>
              <td>
                <StatusBadge status={task.status} />
              </td>
              <td>{task.result || "-"}</td>
              <td>
                <Link to={`/tasks/${task._id}`}>Open</Link>
              </td>
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="muted">
                No tasks yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}