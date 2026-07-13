import "./AboutPanel.css";

const DISCORD_URL = import.meta.env.VITE_DISCORD_INVITE_URL;

export default function AboutPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="about-panel">
      <div className="about-panel-header">
        <h2 className="about-title">How Sonar works</h2>
        <button className="about-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <p className="about-text">
        Sonar watches a handful of known exchange and whale wallets on Ethereum. When a
        wallet moves more than the set USD threshold in a single transaction, it counts
        as a catch — logged here and posted live to Discord.
      </p>

      <ul className="about-list">
        <li>Tracks large ETH and stablecoin transfers on Ethereum mainnet</li>
        <li>Alerts trigger above a fixed USD threshold, checked against live prices</li>
        <li>This dashboard refreshes automatically every 30 seconds</li>
        <li>Testnet activity is flagged separately and never mixed in with real alerts</li>
      </ul>

      {DISCORD_URL && (
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="about-discord-link">
          Join the alert channel on Discord
        </a>
      )}
    </div>
  );
}