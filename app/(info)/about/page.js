export const metadata = {
  title: "About | Speedoodle 🚀",
  description: "Learn what Speedoodle offers and how it keeps the speed test simple and private.",
};

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>Speedoodle is a lightweight internet speed test inspired by Fast.com—simple, fast, and friendly.</p>
      <ul>
        <li>Simplicity: clear download/upload/latency results.</li>
        <li>Privacy: minimal data collection to run the site.</li>
        <li>Availability: hosted on Vercel for quick loads.</li>
      </ul>
      <p>
        Suggestions? <a href="mailto:hello@speedoodle.com">hello@speedoodle.com</a>
      </p>
    </div>
  );
}
