import Head from 'next/head';
import ManualAdSense from '../components/ManualAdSense';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Speedoodle</title>
        <meta name="description" content="Get in touch with the Speedoodle team for questions, suggestions, or feedback." />
      </Head>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please reach out with any questions, suggestions, or comments.</p>

        {/* Strategic AdSense Placement */}
        <div style={{ margin: '24px auto' }}>
          <ManualAdSense />
        </div>

        <p>Email us directly at hello@speedoodle.com</p>
      </div>
    </>
  );
}
