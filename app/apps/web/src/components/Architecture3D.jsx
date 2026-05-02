const nodes = [
  { label: "Client", icon: "🧑‍💻", text: "React dashboard" },
  { label: "API", icon: "🚀", text: "Express + JWT" },
  { label: "Queue", icon: "📦", text: "BullMQ + Redis" },
  { label: "Worker", icon: "⚙️", text: "Async processor" },
  { label: "MongoDB", icon: "🍃", text: "Tasks + logs" },
];

export default function Architecture3D() {
  return (
    <section className="card section">
      <h2>Live System Flow</h2>
      <p className="muted">Client → API → Queue → Worker → Database</p>

      <div className="architecture">
        {nodes.map((node) => (
          <div className="card arch-card" key={node.label}>
            <div className="arch-icon">{node.icon}</div>
            <h3>{node.label}</h3>
            <p className="muted">{node.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}