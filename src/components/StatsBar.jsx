import "./StatsBar.css";

function formatUsd(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

export default function StatsBar({ alerts }) {
  const total = alerts.length;
  const totalVolume = alerts.reduce((sum, a) => sum + a.usdValue, 0);
  const biggest = alerts.reduce(
    (max, a) => (a.usdValue > (max?.usdValue ?? 0) ? a : max),
    null
  );
  const networks = new Set(alerts.map((a) => a.network)).size;

  const stats = [
    { label: "Total Alerts", value: total.toLocaleString() },
    { label: "Total Volume", value: formatUsd(totalVolume) },
    { label: "Biggest Catch", value: biggest ? formatUsd(biggest.usdValue) : "—" },
    { label: "Active Networks", value: networks || "—" },
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}