import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./VolumeChart.css";

function formatUsdShort(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

function dayKey(dateStr) {
  return new Date(dateStr).toISOString().slice(0, 10); // YYYY-MM-DD
}

function dayLabel(key) {
  const date = new Date(`${key}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="volume-tooltip">
      <div className="volume-tooltip-date">{label}</div>
      <div className="volume-tooltip-value">{formatUsdShort(payload[0].value)}</div>
    </div>
  );
}

export default function VolumeChart({ alerts }) {
  const data = useMemo(() => {
    const buckets = new Map(); // dayKey -> total usd

    for (const alert of alerts) {
      const key = dayKey(alert.detectedAt);
      buckets.set(key, (buckets.get(key) ?? 0) + alert.usdValue);
    }

    return [...buckets.entries()]
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([key, value]) => ({ day: dayLabel(key), value }));
  }, [alerts]);

  if (data.length === 0) return null;

  return (
    <div className="volume-chart">
      <div className="volume-chart-title">Volume by day</div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2830" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: "#8b98a5", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={{ stroke: "#1f2830" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatUsdShort}
            tick={{ fill: "#8b98a5", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(45,212,191,0.06)" }} />
          <Bar dataKey="value" fill="#2dd4bf" radius={[3, 3, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}