import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Background Ambient Glow */}
      <div className={styles.glowBg} />

      <nav className={styles.nav}>
        <div className={styles.logo}>AXIOM</div>
        <div className={styles.links}>
          <Link href="/dashboard" className={styles.link}>Login</Link>
          <Link href="/dashboard">
            <button className="btn-primary">Get Access</button>
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Remove Subjectivity from <span className="text-gradient">Human Capital</span>
        </h1>
        <p className={styles.subtitle}>
          The first Skill Intelligence Platform that validates competence through 
          <strong> Proof of Work</strong>, not just proof of learning.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/dashboard">
            <button className="btn-primary">Start Gap Analysis</button>
          </Link>
          <button className={styles.btnSecondary}>View Architecture</button>
        </div>

        {/* Floating Cards Demo */}
        <div className={styles.statsGrid}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4>Gap Detection</h4>
            <div className={styles.statValue} style={{ color: '#ff0055' }}>3 Critical</div>
            <p className={styles.statLabel}>Skills requiring immediate IDP</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4>ROI Engine</h4>
            <div className={styles.statValue} style={{ color: '#00f2ff' }}>+128%</div>
            <p className={styles.statLabel}>Efficiency gain vs Program Cost</p>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
             <h4>Integration Health</h4>
             <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <span className={styles.dot} /> Jira
                <span className={styles.dot} /> Udemy
                <span className={styles.dot} /> Asana
             </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
           <h2 className={styles.sectionTitle}>Built for the Modern Workforce</h2>
           <p style={{ color: 'var(--text-muted)' }}>Everything you need to manage skills, recruitment, and growth.</p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
             <div className={styles.featureIcon}>⚡</div>
             <h3>Real-time Skill Matrix</h3>
             <p>Visualize competency gaps instantly across your entire organization using our weighted scoring algorithm.</p>
          </div>

          <div className={styles.featureCard}>
             <div className={styles.featureIcon}>📈</div>
             <h3>Financial ROI Engine</h3>
             <p>Calculate the exact dollar value of your L&D programs with our dynamic ROI calculator.</p>
          </div>

          <div className={styles.featureCard}>
             <div className={styles.featureIcon}>🤖</div>
             <h3>AI Recruitment</h3>
             <p>Screen candidates automatically and match them to open roles based on actual code contributions.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div style={{ marginBottom: '20px', fontWeight: 700, fontSize: '18px' }}>AXIOM</div>
        <p>&copy; 2026 AXIOM Intelligence. All rights reserved.</p>
      </footer>
    </main>
  );
}
