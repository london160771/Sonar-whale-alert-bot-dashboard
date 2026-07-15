import "./AlertCard.css";
import { getWalletLabel } from "../lib/walletLabels";

function shorten(address) {
  if (!address || address.length < 10) return address ?? "unknown";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function displayAddress(address) {
  const label = getWalletLabel(address);
  return label ? `${label} (${shorten(address)})` : shorten(address);
}

function formatUsd(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatAmount(value) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function explorerUrl(alert) {
  const base = alert.isTestnet ? "https://sepolia.etherscan.io" : "https://etherscan.io";
  return `${base}/tx/${alert.txHash}`;
}

function tweetUrl(alert) {
  const label = getWalletLabel(alert.fromAddress) || getWalletLabel(alert.toAddress);
  const context = label ? ` involving ${label}` : "";
  const text =
    `🐋 Whale alert: ${formatAmount(alert.amount)} ${alert.asset} ` +
    `(${formatUsd(alert.usdValue)}) just moved on ${alert.network}${context}.\n\n` +
    `${explorerUrl(alert)}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export default function AlertCard({ alert }) {
  return (
    <div className={`alert-card ${alert.isTestnet ? "alert-card--testnet" : ""}`}>
      <div className="alert-card-main">
        <div className="alert-amount">
          {formatAmount(alert.amount)} {alert.asset}
        </div>
        <div className="alert-usd">{formatUsd(alert.usdValue)}</div>
      </div>

      <div className="alert-route">
        <span className="alert-address">{displayAddress(alert.fromAddress)}</span>
        <span className="alert-arrow">→</span>
        <span className="alert-address">{displayAddress(alert.toAddress)}</span>
      </div>

      <div className="alert-meta">
        <span className={`alert-badge ${alert.isTestnet ? "alert-badge--testnet" : ""}`}>
          {alert.isTestnet ? "TESTNET" : alert.network}
        </span>
        <a href={explorerUrl(alert)} target="_blank" rel="noreferrer" className="alert-link">
          View tx
        </a>
        <a
          href={tweetUrl(alert)}
          target="_blank"
          rel="noreferrer"
          className="alert-link alert-share"
        >
          Share on X
        </a>
        <span className="alert-time">{timeAgo(alert.detectedAt)}</span>
      </div>
    </div>
  );
}