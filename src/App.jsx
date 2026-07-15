import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchAlerts } from "./lib/api";
import SonarPing from "./components/SonarPing";
import ThemeToggle from "./components/ThemeToggle";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import AlertFeed from "./components/AlertFeed";
import AboutPanel from "./components/AboutPanel";
import VolumeChart from "./components/VolumeChart";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import "./App.css";

const REFRESH_INTERVAL_MS = 30_000;
const PAGE_SIZE = 10;

function withinRange(dateStr, range) {
  if (range === "all") return true;
  const ageMs = Date.now() - new Date(dateStr).getTime();
  if (range === "24h") return ageMs <= 24 * 60 * 60 * 1000;
  if (range === "7d") return ageMs <= 7 * 24 * 60 * 60 * 1000;
  return true;
}

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ network: "all", asset: "all", dateRange: "all" });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    try {
      const data = await fetchAlerts();
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  const networks = useMemo(
    () => [...new Set(alerts.map((a) => a.network))].sort(),
    [alerts]
  );
  const assets = useMemo(
    () => [...new Set(alerts.map((a) => a.asset))].sort(),
    [alerts]
  );

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      if (filters.network !== "all" && a.network !== filters.network) return false;
      if (filters.asset !== "all" && a.asset !== filters.asset) return false;
      if (!withinRange(a.detectedAt, filters.dateRange)) return false;
      return true;
    });
  }, [alerts, filters]);

  // Reset to page 1 whenever the filtered set changes shape (new filter applied,
  // or new alerts arrived) so the user never lands on a now-empty page.
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / PAGE_SIZE));
  const pagedAlerts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAlerts.slice(start, start + PAGE_SIZE);
  }, [filteredAlerts, page]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-block">
          <h1 className="app-title">SONAR</h1>
          <p className="app-subtitle">Whale alert console</p>
        </div>
        <div className="app-header-right">
          <ThemeToggle />
          <button className="about-toggle" onClick={() => setAboutOpen((v) => !v)}>
            {aboutOpen ? "Close" : "About"}
          </button>
          <SonarPing label={loading ? "CONNECTING" : "LIVE"} />
        </div>
      </header>

      <main className="app-main">
        <AboutPanel open={aboutOpen} onClose={() => setAboutOpen(false)} />

        <StatsBar alerts={alerts} />

        <VolumeChart alerts={filteredAlerts} />

        <div className="app-controls">
          <FilterBar
            networks={networks}
            assets={assets}
            filters={filters}
            onChange={setFilters}
          />
          <span className="app-count">
            {filteredAlerts.length} alert{filteredAlerts.length === 1 ? "" : "s"}
          </span>
        </div>

        <AlertFeed alerts={pagedAlerts} loading={loading} error={error} />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </main>

      <Footer />
    </div>
  );
}

export default App;