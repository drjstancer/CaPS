import React from 'react';
import { createRoot } from 'react-dom/client';

function PAWSApp() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.badge}>Mock System</div>
        <h1 style={styles.title}>PAWS Program Operations Mock</h1>
        <p style={styles.text}>
          Program management and compliance tracking tools for PAWS pathway operations.
        </p>
        <div style={styles.grid}>
          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>Compliance Dashboard</h2>
            <p style={styles.tileText}>Track requirements, status, and student progress.</p>
          </div>
          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>Student Records</h2>
            <p style={styles.tileText}>Manage pathway participation and advising data.</p>
          </div>
          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>Reports</h2>
            <p style={styles.tileText}>Prepare exports and summaries for program review.</p>
          </div>
        </div>
        <a href="/" style={styles.back}>← Back to CaPS Applications</a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    padding: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #f8fafc 45%, #ffffff 100%)',
  },
  card: {
    width: 'min(100%, 980px)',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '42px',
    boxShadow: '0 22px 55px rgba(0,0,0,.24)',
    border: '1px solid rgba(15,23,42,.12)',
  },
  badge: {
    display: 'inline-block',
    background: '#FDB719',
    color: '#000',
    fontWeight: 900,
    borderRadius: '999px',
    padding: '9px 14px',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
    lineHeight: 1,
    letterSpacing: '-0.05em',
    color: '#0f172a',
  },
  text: {
    maxWidth: '680px',
    color: '#475569',
    fontSize: '1.08rem',
    lineHeight: 1.65,
    margin: '18px 0 30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  tile: {
    border: '1px solid #e2e8f0',
    borderTop: '5px solid #FDB719',
    borderRadius: '18px',
    padding: '20px',
    background: '#f8fafc',
  },
  tileTitle: {
    margin: '0 0 8px',
    fontSize: '1.18rem',
    color: '#0f172a',
  },
  tileText: {
    margin: 0,
    color: '#64748b',
    lineHeight: 1.5,
  },
  back: {
    display: 'inline-block',
    marginTop: '28px',
    color: '#0f172a',
    fontWeight: 800,
    textDecoration: 'none',
  },
};

createRoot(document.getElementById('root')).render(<PAWSApp />);
