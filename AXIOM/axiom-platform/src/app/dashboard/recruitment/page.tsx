"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
    <Suspense fallback={<div>Loading...</div>}>
      <RecruitmentContent />
    </Suspense>
  );
}

function RecruitmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const viewMode = searchParams.get('view') === 'matrix' ? 'matrix' : 'kanban';

  const setViewMode = (mode: 'kanban' | 'matrix') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', mode);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const QUADRANTS = [
    {
      id: 'q1',
      title: 'Top Priority',
      description: 'Immediate focus (Score 90+)',
      color: '#10b981',
      filter: (c: typeof CANDIDATES[0]) => c.matchScore >= 90
    },
    {
      id: 'q2',
      title: 'High Potential',
      description: 'Strong contenders (Score 80-89)',
      color: '#3b82f6',
      filter: (c: typeof CANDIDATES[0]) => c.matchScore >= 80 && c.matchScore < 90
    },
    {
      id: 'q3',
      title: 'Future Pipeline',
      description: 'Good backup candidates (Score 70-79)',
      color: '#f59e0b',
      filter: (c: typeof CANDIDATES[0]) => c.matchScore >= 70 && c.matchScore < 80
    },
    {
      id: 'q4',
      title: 'Review Needed',
      description: 'Risky or low match (Score < 70)',
      color: '#ef4444',
      filter: (c: typeof CANDIDATES[0]) => c.matchScore < 70
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Recruitment Pipeline</h1>
          <p className={styles.subtitle}>AI-driven candidate scoring and tracking.</p>
        </div>
        
        <div className={styles.headerActions}>
           <div className={styles.viewControls}>
             <button 
               className={`${styles.viewBtn} ${viewMode === 'kanban' ? styles.viewBtnActive : ''}`}
               onClick={() => setViewMode('kanban')}
             >
               Kanban Board
             </button>
             <button 
               className={`${styles.viewBtn} ${viewMode === 'matrix' ? styles.viewBtnActive : ''}`}
               onClick={() => setViewMode('matrix')}
             >
               Priority Matrix
             </button>
           </div>
           <button className="btn-primary" onClick={() => alert('Feature coming soon: Candidate Application Form')}>Add Candidate</button>
        </div>
      </header>

      {viewMode === 'kanban' ? (
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
                    <CandidateCard key={card.id} card={card} />
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
      ) : (
        <div className={styles.matrixGrid}>
           {QUADRANTS.map(q => {
             const items = CANDIDATES.filter(q.filter);
             return (
               <div key={q.id} className={styles.quadrant} style={{ '--q-color': q.color } as React.CSSProperties}>
                 <div className={styles.quadrantHeader}>
                   <div>
                     <div className={styles.qTitle} style={{ color: q.color }}>
                        {q.title}
                        <span className={styles.count}>{items.length}</span>
                     </div>
                     <div className={styles.qDescription}>{q.description}</div>
                   </div>
                 </div>
                 
                 <div className={styles.matrixContent}>
                    {items.map(card => (
                      <CandidateCard key={card.id} card={card} />
                    ))}
                    {items.length === 0 && (
                      <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5, fontSize: '13px' }}>
                        No candidates here
                      </div>
                    )}
                 </div>
               </div>
             )
           })}
        </div>
      )}
    </div>
  );
}

function CandidateCard({ card }: { card: typeof CANDIDATES[0] }) {
  return (
    <div className={styles.card}>
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
  );
}
