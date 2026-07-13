import "./Footer.css";

const LINKS = [
  { label: "Discord", url: import.meta.env.VITE_DISCORD_INVITE_URL },
  { label: "X", url: import.meta.env.VITE_X_URL },
  { label: "Portfolio", url: import.meta.env.VITE_PORTFOLIO_URL },
  { label: "GitHub", url: import.meta.env.VITE_GITHUB_URL },
].filter((link) => link.url);

export default function Footer() {
  return (
    <footer className="app-footer">
      <span className="app-footer-text">Built by Ayyoweb3</span>
      <nav className="app-footer-links">
        {LINKS.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}