/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/about.html", destination: "/about" },
      { source: "/contact.html", destination: "/contact" },
      { source: "/privacy.html", destination: "/privacy" },
      { source: "/terms.html", destination: "/terms" }
    ];
  },
};

module.exports = nextConfig;
