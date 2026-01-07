"use client";

import React from 'react';
import styles from './assessments.module.css';

const MOCK_ASSESSMENTS = [
  {
    id: 1,
    name: 'Q1 Engineering Competency Review',
    date: 'Started Jan 5, 2026',
    completed: 12,
    total: 15,
    status: 'In Progress'
  },
  {
    id: 2,
    name: 'Design Team: Figma Advanced Skills',
    date: 'Started Jan 2, 2026',
    completed: 8,
    total: 8,
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Leadership Potential Analysis',
    date: 'Scheduled for Jan 15, 2026',
    completed: 0,
    total: 5,
    status: 'Scheduled'
  }
];

export default function AssessmentsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Assessments Center</h1>
          <p className={styles.subtitle}>Manage skill evaluations, 360 reviews, and technical challenges.</p>
        </div>
        <button className="btn-primary">Create New Assessment</button>
      </header>

      {/* KPI Cards */}
      <div className={styles.statsGrid}>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statLabel}>Active Campaigns</div>
          <div className={styles.statValue} style={{ color: 'var(--primary)' }}>3</div>
          <div className={styles.statTrend} style={{ color: '#10b981' }}>1 ending soon</div>
        </div>
        
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statLabel}>Avg. Completion Rate</div>
          <div className={styles.statValue}>84%</div>
          <div className={styles.statTrend} style={{ color: 'var(--text-muted)' }}>+2% vs last quarter</div>
        </div>
        
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statLabel}>Critical Gaps Found</div>
          <div className={styles.statValue} style={{ color: 'var(--accent)' }}>12</div>
          <div className={styles.statTrend} style={{ color: 'var(--text-muted)' }}>Requires attention</div>
        </div>
      </div>

      {/* Recent Assessments List */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h2 className={styles.sectionTitle}>Briefs & Campaigns</h2>
        
        <div className={styles.assessmentList}>
          {MOCK_ASSESSMENTS.map((item) => {
            const progress = (item.completed / item.total) * 100;
            let statusColor = '#9ca3af';
            let statusBg = 'rgba(255,255,255,0.05)';
            
            if (item.status === 'In Progress') {
              statusColor = '#3b82f6';
              statusBg = 'rgba(59, 130, 246, 0.1)';
            } else if (item.status === 'Completed') {
              statusColor = '#10b981';
              statusBg = 'rgba(16, 185, 129, 0.1)';
            } else if (item.status === 'Scheduled') {
              statusColor = '#f59e0b';
              statusBg = 'rgba(245, 158, 11, 0.1)';
            }

            return (
              <div key={item.id} className={styles.assessmentItem}>
                <div className={styles.itemInfo}>
                  <div className={styles.iconBox}>
                    {/* Simple Icon placeholder */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className={styles.itemMeta}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemDate}>{item.date}</div>
                  </div>
                </div>

                <div style={{ minWidth: '150px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                    <span>Completion</span>
                    <span>{item.completed}/{item.total}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%`, backgroundColor: statusColor }}></div>
                  </div>
                </div>

                <div className={styles.statusBadge} style={{ color: statusColor, background: statusBg }}>
                  {item.status}
                </div>

                <button className={styles.btnSmall}>
                  Manage
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
