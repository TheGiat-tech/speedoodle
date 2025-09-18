import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata = {
  title: "Speedoodle 🚀",
  description: "Internet speed test with download, upload, ping, jitter, and call quality score.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
        <Script src="https://vercel.com/analytics/script.js" strategy="afterInteractive" defer />
        <Script id="vercel-analytics-init" strategy="afterInteractive">{`
          window.va = window.va || function () {
            (window.vaq = window.vaq || []).push(arguments);
          };
        `}</Script>
      </body>
    </html>
  );
}
