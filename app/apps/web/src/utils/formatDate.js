export function formatDate(dateString) {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);

    if (isNaN(date)) return "-";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "-";
  }
}