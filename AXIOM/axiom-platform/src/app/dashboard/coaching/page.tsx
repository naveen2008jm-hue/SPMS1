"use client";

import { useState } from 'react';
import styles from './page.module.css';

interface CoachingPlan {
  employeeName: string;
  defect: string;
  solution: string;
  tasks: string[];
  assessment: string;
}

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CoachingContent() {
  const searchParams = useSearchParams();
  const initialEmployee = searchParams.get('employee') || '';
  
  const [employeeName, setEmployeeName] = useState(initialEmployee);
  const [defect, setDefect] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<CoachingPlan | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName || !defect) return;

    setLoading(true);
    setPlan(null);

    // Simulate AI Network Request
    setTimeout(() => {
      const mockResponse: CoachingPlan = {
        employeeName,
        defect,
        solution: `Based on the issue "${defect}", the recommended approach is to focus on foundational principles and hands-on practice. The employee shows potential but gaps in execution need to be addressed through structured learning and mentorship.`,
        tasks: [
          `Review documentation regarding ${defect}`,
          "Complete the interactive module on Best Practices (Level 2)",
          "Pair program with a senior developer for 2 sessions",
          "Submit a refactored code sample for review"
        ],
        assessment: "Code Quality & Patterns Assessment (Score target: >85%)"
      };
      
      setPlan(mockResponse);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.title} text-gradient`}>AI Performance Coach</h1>
        <p className={styles.subtitle}>
          AI-driven diagnostics to assign remedial tasks and assessments.
        </p>
      </header>

      <div className={styles.content}>
        {/* Input Section */}
        <section className={`glass-panel ${styles.panelPadding}`}>
          <form onSubmit={handleGenerate} className={styles.formPanel}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Employee Name</label>
              <input 
                type="text" 
                className={styles.input}
                placeholder="e.g. Alex Johnson"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Observed Defect / Skill Gap</label>
              <textarea 
                className={styles.textarea}
                placeholder="Describe the problem (e.g. Difficulty with async/await patterns, Recurring bugs in production...)"
                value={defect}
                onChange={(e) => setDefect(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Analyzing...' : 'Generate Coaching Plan'}
            </button>
          </form>
        </section>

        {/* Output Section */}
        <section className={`${styles.resultPanel} glass-panel`}>
          {loading && (
            <div className={styles.loader}>
              <div className={styles.spinner}></div>
              <p>Consulting AI Models...</p>
            </div>
          )}

          {!loading && !plan && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🤖</div>
              <h3>Ready to Assist</h3>
              <p>Enter employee details to generate a targeted improvement plan.</p>
            </div>
          )}

          {!loading && plan && (
            <div className={styles.resultContent}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span>💡</span> AI Analysis & Solution
                </h3>
                <div className={`${styles.card} ${styles.responseText}`}>
                  {plan.solution}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span>📋</span> Recommended Applications Tasks
                </h3>
                <ul className={styles.taskList}>
                  {plan.tasks.map((task, i) => (
                    <li key={i} className={styles.taskItem}>
                      <div className={styles.checkbox}></div>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span>🎯</span> Targeted Assessment
                </h3>
                <div className={`${styles.card} ${styles.assessmentCard}`}>
                  <div className={styles.assessmentTitle}>
                    {plan.assessment}
                  </div>
                  <div className={styles.assessmentMeta}>
                    Recommended completion by: Next Friday
                  </div>
                </div>
              </div>
              
              <div className={styles.actionFooter} style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="btn-secondary" onClick={() => setPlan(null)}>Discard</button>
                <button className="btn-primary" onClick={() => alert('Plan saved to Employee IDP successfully!')}>
                  Save to IDP
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function CoachingPage() {
  return (
    <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
      <CoachingContent />
    </Suspense>
  );
}
