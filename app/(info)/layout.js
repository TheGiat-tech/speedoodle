import Link from "next/link";

export default function InfoLayout({ children }) {
  return (
    <div className="info-layout">
      <header className="info-header">
        <Link href="/">Speedoodle 🚀</Link>
      </header>
      <main className="info-container">{children}</main>
      <footer className="info-footer">
        <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/about">About</Link> · <Link href="/contact">Contact</Link>
      </footer>
      <style jsx global>{`
        .info-layout {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
          display: flex;
          flex-direction: column;
        }

        .info-header,
        .info-footer {
          background: #e2e8f0;
          padding: 1rem;
          text-align: center;
        }

        .info-header a {
          color: inherit;
          text-decoration: none;
          font-weight: 700;
        }

        .info-container {
          flex: 1;
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
          line-height: 1.6;
        }

        .info-footer {
          font-size: 0.9rem;
        }

        .info-footer a {
          margin: 0 6px;
          text-decoration: none;
        }

        .info-card {
          display: grid;
          gap: 12px;
          padding: 16px;
          border: 1px solid #d4dbea;
          border-radius: 12px;
          background: #f1f5f9;
        }

        label {
          display: grid;
          gap: 6px;
          font-weight: 600;
        }

        input,
        textarea {
          padding: 10px;
          border: 1px solid #cbd5f5;
          border-radius: 8px;
          font: inherit;
        }

        button {
          padding: 10px 16px;
          border: 0;
          border-radius: 8px;
          cursor: pointer;
          background: #2563eb;
          color: #fff;
          font-weight: 600;
        }

      `}</style>
    </div>
  );
}
