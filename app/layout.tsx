import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Call Speed Test  | Speedoodle",
  description: "Check internet quality for Zoom, Google Meet, and Microsoft Teams video calls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LD6QWT7SJ0"
          strategy="afterInteractive"
        />
        <meta name="google-adsense-account" content="ca-pub-8054613417167519" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8054613417167519"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LD6QWT7SJ0');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
