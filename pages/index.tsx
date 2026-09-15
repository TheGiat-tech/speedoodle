import Head from 'next/head';
import ManualAdSense from '../components/ManualAdSense';

export default function Home() {
  return (
    <>
      <Head>
        <title>Internet Speed Test | Speedoodle</title>
        <meta name="description" content="Run a fast, accurate speed test for download, upload, and ping. Mobile-friendly and privacy-first." />
      </Head>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <header style={{ marginTop: '8px' }}>
          <p className="brand" style={{ margin: 0, fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9aa6bd' }}>
            Speedoodle <span style={{ color: '#21d0c3' }}>🚀</span>
          </p>
          <h1 style={{ fontWeight: 800, letterSpacing: '.2px', margin: '12px 0 0', fontSize: '32px', lineHeight: 1.2 }}>
            Is Your Internet Ready for Flawless Video Calls?
          </h1>
          <p className="tagline" style={{ margin: '8px 0 0', color: '#9aa6bd' }}>
            Accurately measure your download, upload, ping, and jitter.
          </p>
        </header>

        <section className="tiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px', margin: '28px 0' }}>
          <div className="tile"><h3>Download</h3><div id="dlVal" className="value">—</div><span className="unit">Mbps</span></div>
          <div className="tile"><h3>Upload</h3><div id="ulVal" className="value">—</div><span className="unit">Mbps</span><div className="unit" id="uplNote"></div></div>
          <div className="tile"><h3>Ping</h3><div id="pingVal" className="value">—</div><span className="unit">ms</span></div>
          <div className="tile"><h3>Jitter</h3><div id="jitterVal" className="value">—</div><span className="unit">ms</span></div>
        </section>

        <div className="go-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
          <button
            className="go"
            id="startBtn"
            type="button"
            aria-label="Start speed test"
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: 'radial-gradient(ellipse at 50% 40%, #23d9cb 0%, #19a396 70%, #0e5f58 100%)',
              color: '#00100f',
              fontWeight: 800,
              fontSize: '32px',
              boxShadow: '0 0 0 6px rgba(33,208,195,.15), 0 8px 28px rgba(0,0,0,.45)',
            }}
          >
            GO
          </button>
        </div>
        <div id="busy" className="busy" role="status">Testing...</div>

        {/* Strategic Ad Placement 1: Directly below the GO button component */}
        <div style={{ margin: '24px auto', maxWidth: '1200px' }}>
          <ManualAdSense />
        </div>

        <section className="card" style={{ marginTop: '14px' }}>
          <h3 style={{ margin: '0 0 10px', color: 'var(--muted)', fontSize: '14px' }}>Live Speed Graph</h3>
          <div className="chart"><canvas id="speedCanvas"></canvas><div id="speedTip"></div></div>
        </section>

        {/* Call Quality Score results area */}
        <section className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px', marginTop: '18px' }}>
          <div className="card">
            <h3 style={{ margin: '0 0 10px', color: '#9aa6bd', fontSize: '14px' }}>Call Quality Score</h3>
            <div className="gauge"><canvas id="scoreCanvas"></canvas><div id="scoreCenter" className="score">0</div></div>
            <div id="scoreBadge" className="badge">—</div>
          </div>
          <div className="card">
            <h3 style={{ margin: '0 0 10px', color: '#9aa6bd', fontSize: '14px' }}>Quality Recommendations</h3>
            <div style={{ color: '#9aa6bd', fontSize: '14px', lineHeight: 1.7 }}>
              <div><strong style={{ color: '#e6edf6' }}>HD 720p</strong>: ≥ 1.2 Mbps up/down</div>
              <div><strong style={{ color: '#e6edf6' }}>Full HD 1080p</strong>: ≥ 3 Mbps down, ≥ 2.5 Mbps up</div>
              <div><strong style={{ color: '#e6edf6' }}>Large Group</strong>: ≥ 5–10 Mbps up/down</div>
            </div>
          </div>
          <div className="card">
            <h3 style={{ margin: '0 0 10px', color: '#9aa6bd', fontSize: '14px' }}>Tips for Better Call Quality</h3>
            <ul className="tips" style={{ margin: 0, paddingLeft: '18px', color: '#9aa6bd', fontSize: '14px', lineHeight: 1.6 }}>
              <li><strong>Use wired</strong> Ethernet instead of Wi-Fi if possible.</li>
              <li>Close <strong>background downloads</strong> or heavy streaming apps.</li>
              <li>Make sure your <strong>router firmware</strong> is updated.</li>
              <li>For best results, connect from a <strong>quiet network environment</strong>.</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ margin: '0 0 10px', color: '#9aa6bd', fontSize: '14px' }}>System Performance</h3>
            <ul className="tips" style={{ margin: 0, paddingLeft: '18px', color: '#9aa6bd', fontSize: '14px', lineHeight: 1.6 }}>
              <li>CPU Usage: <strong id="cpuVal">—</strong> <span id="cpuBadge" className="badge-mini">Idle</span></li>
              <li>Memory Usage: <strong id="memVal">—</strong> <span id="memBadge" className="badge-mini">—</span></li>
              <li>Browser: <strong id="browserVal">—</strong></li>
              <li>OS: <strong id="osVal">—</strong></li>
            </ul>
          </div>
        </section>

        {/* Strategic Ad Placement 2: Directly below the Call Quality Score results area */}
        <div style={{ margin: '24px auto', maxWidth: '1200px' }}>
          <ManualAdSense />
        </div>
      </div>
    </>
  );
}
