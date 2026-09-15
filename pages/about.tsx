import Head from 'next/head';
import ManualAdSense from '../components/ManualAdSense';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Speedoodle</title>
        <meta name="description" content="Learn more about Speedoodle, a fast and privacy-first internet speed test." />
      </Head>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <h1>About Speedoodle</h1>
        <p>Speedoodle is a lightweight internet speed test—simple, fast, and friendly.</p>
        
        {/* Strategic AdSense Placement */}
        <div style={{ margin: '24px auto' }}>
          <ManualAdSense />
        </div>
        
        <p>We focus on speed, privacy, and ease of use to help remote workers and teams diagnose latency, jitter, and bandwidth issues.</p>
      </div>
    </>
  );
}
