import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Call Speed Test  | Speedoodle",
  description: "Check internet quality for Zoom, Google Meet, and Microsoft Teams video calls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
