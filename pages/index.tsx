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

        {/* Strategic AdSense Placement */}
        <div style={{ margin: '24px auto', maxWidth: '1200px' }}>
          <ManualAdSense />
        </div>

        <div className="go-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
          <button
            className="go"
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
      </div>
    </>
  );
}
