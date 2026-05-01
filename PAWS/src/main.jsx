import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const students = [
  { name: 'Jordan Ellis', track: 'JPAWS', classification: 'Freshman', advising: true, attendance: 92, shadowing: false, retreat: false, gpa: 3.72, status: 'On Track' },
  { name: 'Maya Brooks', track: 'JPAWS', classification: 'Sophomore', advising: true, attendance: 84, shadowing: true, retreat: false, gpa: 3.48, status: 'Watch' },
  { name: 'Chris Nguyen', track: 'PAWS Achievers', classification: 'Junior', advising: true, attendance: 96, shadowing: true, retreat: true, gpa: 3.81, status: 'On Track' },
  { name: 'Amara Johnson', track: 'PAWS Pre-Admissions', classification: 'Senior', advising: false, attendance: 76, shadowing: true, retreat: true, gpa: 3.34, status: 'Needs Follow-Up' },
  { name: 'Elijah Carter', track: 'PAWS Scholars', classification: 'M1', advising: true, attendance: 88, shadowing: true, retreat: true, gpa: 3.67, status: 'On Track' },
];

const reqs = ['Advising', 'Attendance', 'Shadowing/Vetting', 'Retreat', 'Academic Standing'];

function PAWSApp() {
  const [view, setView] = useState('home');
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? students : students.filter(s => s.status === filter);
  const metrics = useMemo(() => {
    const onTrack = students.filter(s => s.status === 'On Track').length;
    const needs = students.filter(s => s.status !== 'On Track').length;
    const avgAttendance = Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length);
    const shadowReady = students.filter(s => s.shadowing).length;
    return { onTrack, needs, avgAttendance, shadowReady };
  }, []);

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.topRow}>
          <div>
            <div style={styles.badge}>Mock System</div>
            <h1 style={styles.title}>PAWS Program Operations Mock</h1>
            <p style={styles.text}>Program management and compliance tracking tools for PAWS pathway operations.</p>
          </div>
          <a href="/" style={styles.homeLink}>CaPS Home</a>
        </div>

        {view === 'home' ? (
          <div style={styles.grid}>
            <button style={styles.tileButton} onClick={() => setView('dashboard')}>
              <h2 style={styles.tileTitle}>Compliance Dashboard</h2>
              <p style={styles.tileText}>Track requirements, status, and student progress.</p>
              <span style={styles.open}>Open module →</span>
            </button>
            <div style={styles.tile}><h2 style={styles.tileTitle}>Student Records</h2><p style={styles.tileText}>Manage pathway participation and advising data. Coming next.</p></div>
            <div style={styles.tile}><h2 style={styles.tileTitle}>Reports</h2><p style={styles.tileText}>Prepare exports and summaries for program review. Coming next.</p></div>
          </div>
        ) : (
          <Dashboard filter={filter} setFilter={setFilter} visible={visible} metrics={metrics} onBack={() => setView('home')} />
        )}
      </section>
    </main>
  );
}

function Dashboard({ filter, setFilter, visible, metrics, onBack }) {
  return (
    <div>
      <button style={styles.backButton} onClick={onBack}>← Back to PAWS modules</button>
      <div style={styles.dashboardHeader}>
        <div>
          <h2 style={styles.sectionTitle}>Compliance Dashboard</h2>
          <p style={styles.smallText}>Mock data for station testing. This is not connected to live student records yet.</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.select}>
          {['All', 'On Track', 'Watch', 'Needs Follow-Up'].map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div style={styles.metricGrid}>
        <Metric label="On Track" value={metrics.onTrack} />
        <Metric label="Needs Attention" value={metrics.needs} />
        <Metric label="Avg Attendance" value={`${metrics.avgAttendance}%`} />
        <Metric label="Shadow Ready" value={metrics.shadowReady} />
      </div>

      <div style={styles.requirementPanel}>
        <h3 style={styles.panelTitle}>Requirement Categories</h3>
        <div style={styles.reqGrid}>{reqs.map(r => <span key={r} style={styles.reqPill}>{r}</span>)}</div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead><tr>{['Student', 'Track', 'Class', 'Attendance', 'GPA', 'Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
          <tbody>
            {visible.map(s => (
              <tr key={s.name}>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.track}</td>
                <td style={styles.td}>{s.classification}</td>
                <td style={styles.td}>{s.attendance}%</td>
                <td style={styles.td}>{s.gpa}</td>
                <td style={styles.td}><span style={{...styles.status, ...statusStyle(s.status)}}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return <div style={styles.metric}><div style={styles.metricValue}>{value}</div><div style={styles.metricLabel}>{label}</div></div>;
}

function statusStyle(status) {
  if (status === 'On Track') return { background: '#dcfce7', color: '#166534' };
  if (status === 'Watch') return { background: '#fef9c3', color: '#854d0e' };
  return { background: '#fee2e2', color: '#991b1b' };
}

const styles = {
  page: { minHeight: '100vh', margin: 0, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, Helvetica, sans-serif', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #f8fafc 45%, #ffffff 100%)' },
  card: { width: 'min(100%, 1120px)', background: '#fff', borderRadius: 28, padding: 42, boxShadow: '0 22px 55px rgba(0,0,0,.24)', border: '1px solid rgba(15,23,42,.12)' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' },
  badge: { display: 'inline-block', background: '#FDB719', color: '#000', fontWeight: 900, borderRadius: 999, padding: '9px 14px', marginBottom: 16 },
  title: { margin: 0, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.05em', color: '#0f172a' },
  text: { maxWidth: 680, color: '#475569', fontSize: '1.08rem', lineHeight: 1.65, margin: '18px 0 30px' },
  homeLink: { color: '#0f172a', fontWeight: 800, textDecoration: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 },
  tile: { border: '1px solid #e2e8f0', borderTop: '5px solid #FDB719', borderRadius: 18, padding: 20, background: '#f8fafc' },
  tileButton: { border: '1px solid #e2e8f0', borderTop: '5px solid #FDB719', borderRadius: 18, padding: 20, background: '#f8fafc', textAlign: 'left', cursor: 'pointer', font: 'inherit' },
  tileTitle: { margin: '0 0 8px', fontSize: '1.18rem', color: '#0f172a' },
  tileText: { margin: 0, color: '#64748b', lineHeight: 1.5 },
  open: { display: 'inline-block', marginTop: 16, fontWeight: 800, color: '#0f172a' },
  backButton: { border: 0, background: 'transparent', color: '#0f172a', fontWeight: 800, cursor: 'pointer', padding: 0, marginBottom: 18 },
  dashboardHeader: { display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' },
  sectionTitle: { margin: 0, fontSize: '1.8rem', color: '#0f172a' },
  smallText: { margin: '8px 0 0', color: '#64748b' },
  select: { border: '1px solid #cbd5e1', borderRadius: 12, padding: '10px 12px', background: '#fff' },
  metricGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, margin: '24px 0' },
  metric: { background: '#0f172a', color: '#fff', borderRadius: 18, padding: 18 },
  metricValue: { fontSize: '2rem', fontWeight: 900 },
  metricLabel: { color: '#cbd5e1', fontSize: '.9rem' },
  requirementPanel: { border: '1px solid #e2e8f0', borderRadius: 18, padding: 18, marginBottom: 18, background: '#f8fafc' },
  panelTitle: { margin: '0 0 12px', color: '#0f172a' },
  reqGrid: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  reqPill: { background: '#fff3d6', border: '1px solid #FDB719', borderRadius: 999, padding: '8px 10px', fontWeight: 700 },
  tableWrap: { overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 18 },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 720 },
  th: { textAlign: 'left', padding: 14, background: '#f1f5f9', color: '#334155', fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.06em' },
  td: { padding: 14, borderTop: '1px solid #e2e8f0', color: '#0f172a' },
  status: { borderRadius: 999, padding: '6px 10px', fontWeight: 800, fontSize: '.82rem' },
};

createRoot(document.getElementById('root')).render(<PAWSApp />);
