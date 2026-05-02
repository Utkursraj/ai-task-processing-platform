export default function ResultCard({ task }) {
  return (
    <section className="card section">
      <h2>Result</h2>

      {!task?.result ? (
        <p className="muted">Result not available yet.</p>
      ) : (
        <pre className="result-box">{task.result}</pre>
      )}
    </section>
  );
}