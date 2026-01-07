"use client";

import React from 'react';
import styles from './recruitment.module.css';

// -- Mock Data --
const CANDIDATES = [
  {
    id: 101,
    name: 'Alex Johnson',
    role: 'Senior Rust Engineer',
    matchScore: 94,
    skills: ['Rust', 'WASM', 'Tokio'],
    status: 'Screening',
    date: 'Applied 2d ago'
  },
  {
    id: 102,
    name: 'Maria Garcia',
    role: 'Product Designer',
    matchScore: 88,
    skills: ['Figma', 'Prototyping'],
    status: 'Screening',
    date: 'Applied 1d ago'
  },
  {
    id: 201,
    name: 'Sam Smith',
    role: 'DevOps Engineer',
    matchScore: 76,
    skills: ['AWS', 'Docker'],
    status: 'Assessment',
    date: 'Test Sent 3d ago'
  },
  {
    id: 202,
    name: 'Priya Patel',
    role: 'Data Scientist',
    matchScore: 92,
    skills: ['Python', 'PyTorch', 'NLP'],
    status: 'Assessment',
    date: 'Reviewing Submission'
  },
  {
    id: 301,
    name: 'Jordan Lee',
    role: 'Frontend Lead',
    matchScore: 95,
    skills: ['React', 'Next.js', 'WebGL'],
    status: 'Interview',
    date: 'Final Round Tomorrow'
  }
];

const COLUMNS = [
  { id: 'Screening', title: 'Resume Screening' },
  { id: 'Assessment', title: 'Technical Assessment' },
  { id: 'Interview', title: 'Interview Stage' },
  { id: 'Offer', title: 'Offer Sent' }
];

export default function RecruitmentPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Recruitment Pipeline</h1>
          <p className={styles.subtitle}>AI-driven candidate scoring and tracking.</p>
        </div>
        <button className="btn-primary">Add Candidate</button>
      </header>

      <div className={styles.kanban}>
        {COLUMNS.map(col => {
          const items = CANDIDATES.filter(c => c.status === col.id);
          return (
            <div key={col.id} className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={styles.columnTitle}>{col.title}</span>
                <span className={styles.count}>{items.length}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map(card => (
                  <div key={card.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div>
                        <div className={styles.role}>{card.role}</div>
                        <div className={styles.name}>{card.name}</div>
                      </div>
                      <div className={styles.scoreBox}>
                         <div className={styles.score}>{card.matchScore}%</div>
                         <div className={styles.scoreLabel}>Match</div>
                      </div>
                    </div>
                    
                    <div className={styles.tags}>
                      {card.skills.map(s => (
                        <span key={s} className={styles.tag}>{s}</span>
                      ))}
                    </div>
                    
                    <div className={styles.cardActions}>
                       <span className={styles.date}>{card.date}</span>
                       <button className={styles.btnView}>View Profile &rarr;</button>
                    </div>
                  </div>
                ))}
                
                {items.length === 0 && (
                   <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-glass)', borderRadius: '8px', fontSize: '13px' }}>
                     No candidates in this stage
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
