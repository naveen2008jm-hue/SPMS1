import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, here's what's happening with your workforce.</p>
        </div>
        <button className="btn-primary">New Assessment</button>
      </header>

      {/* KPI Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total Employees</h3>
          <div style={{ fontSize: '36px', fontWeight: '700', fontFamily: 'Outfit' }}>1,248</div>
          <div style={{ color: '#10b981', fontSize: '14px', marginTop: '4px' }}>+12% this month</div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Skill Gaps Identified</h3>
          <div style={{ fontSize: '36px', fontWeight: '700', fontFamily: 'Outfit', color: 'var(--accent)' }}>86</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Across 12 departments</div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Avg. Competency Score</h3>
          <div style={{ fontSize: '36px', fontWeight: '700', fontFamily: 'Outfit' }}>7.8<span style={{ fontSize: '20px', color: 'var(--text-muted)' }}>/10</span></div>
          <div style={{ color: 'var(--primary)', fontSize: '14px', marginTop: '4px' }}>+0.4 increase</div>
        </div>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>ROI Generated</h3>
          <div style={{ fontSize: '36px', fontWeight: '700', fontFamily: 'Outfit' }} className="text-gradient">$42.5k</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Projected for Q1</div>
        </div>
      </div>

      {/* Main Content Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Recent Activity / Gap Analysis */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2>Critical Skill Gaps</h2>
            <Link href="/dashboard/assessments" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { role: 'Senior Backend Engineer', skill: 'Rust', depth: 'High', candidates: 4 },
              { role: 'Product Designer', skill: 'Figma Prototyping', depth: 'Medium', candidates: 12 },
              { role: 'Data Scientist', skill: 'PyTorch', depth: 'High', candidates: 2 },
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{item.role}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Missing: <span style={{ color: 'var(--text-main)' }}>{item.skill}</span></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ 
                     fontSize: '12px', 
                     padding: '4px 8px', 
                     background: item.depth === 'High' ? 'rgba(255, 0, 85, 0.2)' : 'rgba(255, 255, 255, 0.1)', 
                     color: item.depth === 'High' ? 'var(--accent)' : 'var(--text-main)',
                     borderRadius: '4px',
                     display: 'inline-block',
                     marginBottom: '4px'
                   }}>
                     {item.depth} Priority
                   </div>
                   <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.candidates} employees affected</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Integrations */}
        <div className="glass-panel" style={{ padding: '32px' }}>
           <h2 style={{ marginBottom: '24px' }}>Platform Sync</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {[
               { name: 'Jira', status: 'Synced', time: '2m ago', color: '#0052CC' },
               { name: 'GitHub', status: 'Synced', time: '5m ago', color: '#ffffff' },
               { name: 'Udemy Business', status: 'Syncing...', time: 'Now', color: '#A435F0' },
               { name: 'Workday', status: 'Error', time: '1h ago', color: '#E2231A' },
             ].map((integration, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ 
                   width: '40px', 
                   height: '40px', 
                   borderRadius: '8px', 
                   background: 'rgba(255,255,255,0.05)', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   fontSize: '18px',
                   fontWeight: '700',
                   color: integration.color
                 }}>
                   {integration.name[0]}
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontWeight: '500' }}>{integration.name}</div>
                   <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{integration.time}</div>
                 </div>
                 <div style={{ 
                   width: '8px', 
                   height: '8px', 
                   borderRadius: '50%', 
                   background: integration.status === 'Synced' ? '#10b981' : integration.status === 'Error' ? 'var(--accent)' : 'var(--primary)' 
                 }} />
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
