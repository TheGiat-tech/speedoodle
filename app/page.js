import Script from "next/script";

export const metadata = {
  title: "Speedoodle — Internet Speed Test + Call Quality Score",
  description: "Download/Upload/Ping/Jitter + live graph + 0–100 call quality score.",
};

export default function HomePage() {
  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <header className="home-header">
            <h1>
              Speedoodle <span className="home-emoji">🚀</span>
            </h1>
            <p>Internet Speed Test + Call Quality Score</p>
          </header>

          <section className="tiles">
            <div className="tile">
              <h3>Download</h3>
              <div id="dlVal" className="value">
                —
              </div>
              <span className="unit">Mbps</span>
            </div>
            <div className="tile">
              <h3>Upload</h3>
              <div id="ulVal" className="value">
                —
              </div>
              <span className="unit">Mbps</span>
              <div className="unit" id="uplNote"></div>
            </div>
            <div className="tile">
              <h3>Ping</h3>
              <div id="pingVal" className="value">
                —
              </div>
              <span className="unit">ms</span>
            </div>
            <div className="tile">
              <h3>Jitter</h3>
              <div id="jitterVal" className="value">
                —
              </div>
              <span className="unit">ms</span>
            </div>
          </section>

          <div className="go-wrap">
            <button id="startBtn" className="go" type="button" aria-label="Start speed test">
              GO
            </button>
          </div>
          <div id="busy" className="busy" role="status">
            Testing...
          </div>

          <section className="card card-spaced">
            <h3 className="card-heading">Live Speed Graph</h3>
            <div className="chart">
              <canvas id="speedCanvas"></canvas>
              <div id="speedTip"></div>
            </div>
          </section>

          <section className="grid-4">
            <div className="card">
              <h3 className="card-heading">Call Quality Score</h3>
              <div className="gauge">
                <canvas id="scoreCanvas"></canvas>
                <div id="scoreCenter" className="score">
                  0
                </div>
              </div>
              <div id="scoreBadge" className="badge">
                —
              </div>
            </div>
            <div className="card">
              <h3 className="card-heading">Quality Recommendations</h3>
              <div className="tips-text">
                <div>
                  <strong>HD 720p</strong>: ≥ 1.2 Mbps up/down
                </div>
                <div>
                  <strong>Full HD 1080p</strong>: ≥ 3 Mbps down, ≥ 2.5 Mbps up
                </div>
                <div>
                  <strong>Large Group</strong>: ≥ 5–10 Mbps up/down
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="card-heading">Tips for Better Call Quality</h3>
              <ul className="tips-list">
                <li>
                  <strong>Use wired</strong> Ethernet instead of Wi-Fi if possible.
                </li>
                <li>Close <strong>background downloads</strong> or heavy streaming apps.</li>
                <li>Make sure your <strong>router firmware</strong> is updated.</li>
                <li>
                  For best results, connect from a <strong>quiet network environment</strong>.
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="card-heading">System Performance</h3>
              <ul className="tips-list">
                <li>
                  CPU Usage: <strong id="cpuVal">—</strong> <span id="cpuBadge" className="badge-mini">Idle</span>
                  <div className="meter">
                    <div id="cpuBar" className="fill"></div>
                  </div>
                </li>
                <li>
                  Memory Usage: <strong id="memVal">—</strong> <span id="memBadge" className="badge-mini">—</span>
                  <div className="meter">
                    <div id="memBar" className="fill"></div>
                  </div>
                </li>
                <li>
                  Browser: <strong id="browserVal">—</strong>
                </li>
                <li>
                  OS: <strong id="osVal">—</strong>
                </li>
              </ul>
              <button id="metricsCsv" className="badge-mini metrics-btn">
                Download metrics CSV
              </button>
            </div>
          </section>

          <section className="grid-2">
            <div className="card">
              <h3 className="card-heading">Issues &amp; Verdict</h3>
              <pre id="verdict">Looks great for video calls.</pre>
            </div>
            <div className="card">
              <h3 className="card-heading">Connection Details</h3>
              <div className="ip">
                <div>
                  <span className="label">IP Address</span>
                  <strong id="ipVal">—</strong>
                </div>
                <div>
                  <span className="label">ISP</span>
                  <strong id="ispVal">—</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="card">
            <h3 className="card-heading">How it works</h3>
            <p>
              We run quick download &amp; upload streams against Cloudflare&apos;s speed endpoints, measure ping/jitter, and combine them into
              a call quality score (0–100) with a handy verdict.
            </p>
            <p>
              Tip: Run the test a few times to get a stable reading. Network congestion, Wi-Fi interference, and background tasks can
              all impact your speed.
            </p>
          </section>

          <section className="card">
            <h3 className="card-heading">Need to share results?</h3>
            <p>
              Take a screenshot or export the CSV to send diagnostics to your IT team. You can also mention your ISP and plan for context.
            </p>
          </section>
        </div>
      </div>
      <Script src="/scripts/speedoodle.js" strategy="afterInteractive" />
      <style jsx global>{`
        .home-page {
          --bg: #0b1020;
          --panel: #171e2b;
          --border: #2b3546;
          --muted: #9aa6bd;
          --text: #e6edf6;
          --teal: #21d0c3;
          --good: #21d6c7;
          --warn: #f2c94c;
          --bad: #ff5470;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }

        .home-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 24px;
        }

        .home-header {
          text-align: center;
          margin-top: 8px;
        }

        .home-header h1 {
          font-weight: 800;
          letter-spacing: 0.2px;
          margin: 0;
          font-size: 28px;
        }

        .home-header p {
          margin: 0.5rem 0 0;
          color: var(--muted);
        }

        .home-emoji {
          color: var(--teal);
        }

        .tiles {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin: 28px 0;
        }

        .tile {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
          text-align: center;
        }

        .tile h3 {
          margin: 0 0 6px;
          font-size: 13px;
          color: var(--muted);
          font-weight: 600;
        }

        .tile .value {
          font-size: 44px;
          line-height: 1;
          font-weight: 800;
        }

        .tile .unit {
          display: block;
          margin-top: 4px;
          font-size: 12px;
          color: var(--muted);
        }

        .go-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 10px 0 22px;
        }

        .go {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: radial-gradient(ellipse at 50% 40%, #23d9cb 0%, #19a396 70%, #0e5f58 100%);
          color: #00100f;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: 0.5px;
          box-shadow: 0 0 0 6px rgba(33, 208, 195, 0.15), 0 8px 28px rgba(0, 0, 0, 0.45);
          transition: transform 0.2s ease;
        }

        .go:active {
          transform: scale(0.95);
        }

        .busy {
          display: none;
          color: var(--muted);
          font-size: 14px;
          margin-top: 10px;
          text-align: center;
        }

        .busy.show {
          display: block;
        }

        .card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
        }

        .card-spaced {
          margin-top: 14px;
        }

        .card-heading {
          margin: 0 0 10px;
          color: var(--muted);
          font-size: 14px;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
        }

        .chart {
          position: relative;
          height: 260px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
          border-radius: 12px;
          padding: 16px;
          border: 1px solid var(--border);
        }

        .chart canvas {
          width: 100%;
          height: 100%;
        }

        #speedTip {
          position: absolute;
          pointer-events: none;
          top: 0;
          left: 0;
          transform: translate(-50%, -120%);
          background: #0f1626;
          border: 1px solid var(--border);
          padding: 6px 8px;
          border-radius: 8px;
          color: #cfe6ff;
          font-size: 12px;
          display: none;
          white-space: nowrap;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
        }

        .gauge {
          position: relative;
          height: 200px;
        }

        .gauge canvas {
          width: 100%;
          height: 100%;
        }

        .score {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 38px;
          font-weight: 800;
        }

        .badge {
          display: inline-block;
          margin-top: 10px;
          padding: 6px 10px;
          border-radius: 999px;
          background: #243044;
          color: #c4d0e0;
          font-size: 12px;
          font-weight: 600;
        }

        .tips-text {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .tips-list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
          list-style: disc;
        }

        .ip {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          color: var(--muted);
        }

        .ip strong {
          color: var(--text);
        }

        .meter {
          height: 10px;
          background: #0f1626;
          border: 1px solid var(--border);
          border-radius: 999px;
          overflow: hidden;
          margin-top: 6px;
        }

        .meter .fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #21d6c7, #19a396);
          transition: width 0.35s ease;
        }

        .badge-mini {
          display: inline-block;
          margin-left: 8px;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 12px;
          border: 1px solid var(--border);
          color: #cfe6ff;
          background: #0f1626;
        }

        .metrics-btn {
          margin-top: 10px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
        }

        pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--muted);
          font-size: 14px;
        }

        .label {
          display: block;
          font-size: 12px;
          margin-bottom: 4px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .status-ok {
          color: #b8f3ea;
        }

        .status-warn {
          color: var(--warn);
        }

        .status-bad {
          color: #ff7b91;
        }

        @media (max-width: 860px) {
          .tiles {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .grid-4 {
            grid-template-columns: 1fr;
          }

          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
