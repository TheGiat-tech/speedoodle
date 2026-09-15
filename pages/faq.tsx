import Head from 'next/head';
import ManualAdSense from '../components/ManualAdSense';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ | Speedoodle</title>
        <meta name="description" content="Frequently asked questions about internet speed tests, latency, jitter, and packet loss." />
      </Head>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <h1>Video Call Speed Test FAQ</h1>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Why do latency and ping matter for video calls?</h3>
          <p>Latency represents the time it takes data to travel to a meeting server and back. Lower ping keeps conversations snappy and prevents participants from talking over one another.</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>What is jitter and how can I reduce it?</h3>
          <p>Jitter is the variation in packet delivery times. Use wired connections, prioritize real-time traffic on your router, and avoid congested Wi-Fi channels to keep jitter low.</p>
        </div>

        {/* Strategic AdSense Placement */}
        <div style={{ margin: '24px auto' }}>
          <ManualAdSense />
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Do upload speeds matter as much as download?</h3>
          <p>Yes. Upload throughput carries your audio and video stream to everyone else. For HD calls we recommend at least 3 Mbps upload and a little headroom for screen sharing.</p>
        </div>
      </div>
    </>
  );
}
