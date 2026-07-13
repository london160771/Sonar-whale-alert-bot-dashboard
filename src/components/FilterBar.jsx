import "./FilterBar.css";

const DATE_RANGES = [
  { value: "all", label: "All time" },
  { value: "24h", label: "Last 24h" },
  { value: "7d", label: "Last 7 days" },
];

export default function FilterBar({
  networks,
  assets,
  filters,
  onChange,
}) {
  return (
    <div className="filter-bar">
      <select
        value={filters.network}
        onChange={(e) => onChange({ ...filters, network: e.target.value })}
      >
        <option value="all">All networks</option>
        {networks.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <select
        value={filters.asset}
        onChange={(e) => onChange({ ...filters, asset: e.target.value })}
      >
        <option value="all">All assets</option>
        {assets.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => onChange({ ...filters, dateRange: e.target.value })}
      >
        {DATE_RANGES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}