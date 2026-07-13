import AlertCard from "./AlertCard";
import "./AlertFeed.css";

export default function AlertFeed({ alerts, loading, error }) {
  if (loading) {
    return <div className="feed-state">Scanning the chain…</div>;
  }

  if (error) {
    return (
      <div className="feed-state feed-state--error">
        Couldn't reach the alert feed. {error}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="feed-state">
        No whale activity matches these filters yet. Alerts will appear here the moment
        a tracked wallet crosses the threshold.
      </div>
    );
  }

  return (
    <div className="alert-feed">
      {alerts.map((alert) => (
        <AlertCard key={alert._id ?? alert.txHash} alert={alert} />
      ))}
    </div>
  );
}