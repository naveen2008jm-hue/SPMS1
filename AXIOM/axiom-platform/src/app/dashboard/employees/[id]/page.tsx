"use client";

import React, { use } from 'react';
import Link from 'next/link';
import styles from './idp.module.css';

// -- Mock Data for a specific employee --
const EMPLOYEE_DATA = {
  id: '1',
  name: 'Sarah Chen',
  role: 'Senior Backend Engineer',
  department: 'Engineering',
  tenure: '1.8 Years',
  location: 'San Francisco, CA',
  skills: [
    { name: 'Rust Development', required: 90, actual: 82, gap: -8, critical: false },
    { name: 'System Architecture', required: 95, actual: 70, gap: -25, critical: true },
    { name: 'Kubernetes', required: 80, actual: 88, gap: +8, critical: false },
    { name: 'GraphQL', required: 85, actual: 85, gap: 0, critical: false },
  ],
  developmentPlan: [
    {
      type: 'Course',
      title: 'Advanced System Design Patterns',
      description: 'Udemy Business path to address architecture scoring gap.',
      status: 'In Progress',
      progress: 65,
      dueDate: 'Feb 15, 2026'
    },
    {
      type: 'Mentorship',
      title: 'Pair Programming with Principal Eng.',
      description: 'Weekly sessions focusing on scalable microservices.',
      status: 'Scheduled',
      progress: 0,
      dueDate: 'Starting Jan 20'
    },
    {
      type: 'Project',
      title: 'Lead Payment Gateway Migration',
      description: 'Practical application of new architecture skills.',
      status: 'Not Started',
      progress: 0,
      dueDate: 'Q2 2026'
    }
  ]
};

export default function EmployeeProfile({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);
  // In a real app, use id to fetch data. Using mock for now.
  const emp = EMPLOYEE_DATA;

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <div className={styles.container}>
      <Link href="/dashboard/employees" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontSize: '14px' }}>
        &larr; Back to Directory
      </Link>

      <div className={styles.profileHeader}>
        <div className={styles.avatarLg}>{getInitials(emp.name)}</div>
        <div className={styles.headerInfo}>
           <h1>{emp.name}</h1>
           <div className={styles.headerMeta}>
             <span>{emp.role}</span> &bull;
             <span>{emp.department}</span> &bull;
             <span>{emp.location}</span>
           </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
           <button className="btn-primary">Edit Profile</button>
           <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-glass)', boxShadow: 'none', color: '#fff' }}>Export IDP</button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column: Skill Gap Analysis */}
        <div>
          <h3 className={styles.sectionTitle}>Skill Gap Analysis</h3>
          <div className="glass-panel" style={{ padding: '24px' }}>
             {emp.skills.map((skill, i) => (
               <div key={i} className={styles.skillRow}>
                 <div className={styles.skillInfo}>
                   <h4 style={{ color: skill.critical ? 'var(--accent)' : 'var(--text-main)' }}>
                     {skill.name} {skill.critical && <span style={{ fontSize: '10px', border: '1px solid var(--accent)', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>CRITICAL</span>}
                   </h4>
                   <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                     Target: {skill.required} | Current: {skill.actual}
                   </p>
                 </div>
                 
                 <div className={styles.bars}>
                   <div className={styles.barWrapper}>
                      <span style={{ width: '40px', color: 'var(--text-muted)' }}>Req</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${skill.required}%`, background: 'rgba(255,255,255,0.3)' }}></div>
                      </div>
                   </div>
                   <div className={styles.barWrapper}>
                      <span style={{ width: '40px', color: 'var(--text-muted)' }}>Act</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ 
                          width: `${skill.actual}%`, 
                          background: skill.actual >= skill.required ? '#10b981' : skill.critical ? 'var(--accent)' : 'var(--primary)' 
                        }}></div>
                      </div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
          
          <div style={{ marginTop: '24px' }}>
            <h3 className={styles.sectionTitle}>Recent Activity</h3>
            <div className="glass-panel" style={{ padding: '24px' }}>
               <ul style={{ listStyle: 'none', padding: 0 }}>
                 <li style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: '14px', fontWeight: 600 }}>Completed ticket #AX-4291</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Demonstrated high proficiency in Rust memory safety patterns.</div>
                   <div style={{ fontSize: '11px', color: '#10b981', marginTop: '6px' }}>+2.4 Work Output Score</div>
                 </li>
                 <li style={{ paddingBottom: '0' }}>
                   <div style={{ fontSize: '14px', fontWeight: 600 }}>GitHub PR Review</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Reviewed 12 PRs this week. Higher than team average (8).</div>
                 </li>
               </ul>
            </div>
          </div>
        </div>

        {/* Right Column: IDP */}
        <div>
          <h3 className={styles.sectionTitle}>
             Development Plan (IDP)
             <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '14px' }}>+ Add Item</button>
          </h3>
          
          {emp.developmentPlan.map((item, i) => (
            <div key={i} className={styles.planCard}>
              <div className={styles.planType}>{item.type}</div>
              <div className={styles.planTitle}>{item.title}</div>
              <div className={styles.planDesc}>{item.description}</div>
              
              <div className={styles.status}>
                <span style={{ color: item.status === 'In Progress' ? '#3b82f6' : 'var(--text-muted)' }}>
                  {item.status} {item.progress > 0 && `(${item.progress}%)`}
                </span>
                <span>{item.dueDate}</span>
              </div>
              
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
                 {item.status === 'Not Started' ? (
                   <button className={styles.btnAction}>Start Now</button>
                 ) : (
                   <button className={styles.btnAction} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>View Details</button>
                 )}
              </div>
            </div>
          ))}
          
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', marginTop: '24px', background: 'rgba(0, 242, 255, 0.05)', borderColor: 'var(--primary)' }}>
             <h4 style={{ marginBottom: '8px' }}>GenAI Coach</h4>
             <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
               "Sarah would benefit from focusing on System Design this quarter to prepare for the Staff Engineer promotion track."
             </p>
             <Link href={`/dashboard/coaching?employee=${encodeURIComponent(emp.name)}`}>
               <button style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                 Ask AXIOM Coach
               </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
