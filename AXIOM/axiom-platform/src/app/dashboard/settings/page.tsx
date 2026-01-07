"use client";

import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      <header style={{ marginBottom: '40px' }}>
         <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Settings</h1>
         <p style={{ color: 'var(--text-muted)' }}>Configure platform integrations and preferences.</p>
      </header>
      
      <div style={{ maxWidth: '800px' }}>
        
        {/* Integrations Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Integrations</h2>
          <div className="glass-panel" style={{ padding: '24px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                 <div style={{ width: '40px', height: '40px', background: '#0052CC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>J</div>
                 <div>
                   <div style={{ fontWeight: 600 }}>Jira</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sync tasks and issues for work output tracking.</div>
                 </div>
               </div>
               <button style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b981', borderRadius: '6px', cursor: 'pointer' }}>Connected</button>
             </div>

             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                 <div style={{ width: '40px', height: '40px', background: '#24292e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>G</div>
                 <div>
                   <div style={{ fontWeight: 600 }}>GitHub</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Analyze code contributions and review activity.</div>
                 </div>
               </div>
               <button style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b981', borderRadius: '6px', cursor: 'pointer' }}>Connected</button>
             </div>
          </div>
        </section>

        {/* Algorithm Weights */}
        <section>
          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Scoring Algorithm Config</h2>
          <div className="glass-panel" style={{ padding: '32px' }}>
             <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Adjust how the AXIOM engine weighs different data sources.</p>
             
             {[
               { label: 'Work Output (Jira/Git)', value: 40 },
               { label: 'Manager Observation', value: 30 },
               { label: 'Peer Feedback', value: 20 },
               { label: 'Tool Usage', value: 10 },
             ].map((w, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span>{w.label}</span>
                    <span style={{ color: 'var(--primary)' }}>{w.value}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                    <div style={{ height: '100%', width: `${w.value}%`, background: 'var(--primary)', borderRadius: '3px' }}></div>
                  </div>
                </div>
             ))}
             
             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
               <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Save Configuration</button>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
