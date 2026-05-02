export default function LogsPanel({ logs = [] }) {
  return (
    <section className="card section">
      <h2>Task Logs</h2>

      <div className="log-box">
        {logs.length === 0 && <p className="muted">No logs available.</p>}

        {logs.map((log) => (
          <div key={log._id} style={{ marginBottom: "12px" }}>
            <strong>[{log.level}]</strong>{" "}
            <span>{log.message}</span>
            <div className="muted">
              {new Date(log.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}