import "./SonarPing.css";

export default function SonarPing({ label = "LIVE" }) {
  return (
    <div className="sonar">
      <span className="sonar-dot-wrap">
        <span className="sonar-ring" />
        <span className="sonar-ring sonar-ring-delay" />
        <span className="sonar-dot" />
      </span>
      <span className="sonar-label">{label}</span>
    </div>
  );
}