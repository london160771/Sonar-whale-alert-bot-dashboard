const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchAlerts(limit = 200) {
  const res = await fetch(`${API_URL}/api/alerts?limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch alerts: ${res.status}`);
  }
  return res.json();
}