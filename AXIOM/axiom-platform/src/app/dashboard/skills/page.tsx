"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './skills.module.css';

// -- Mock Data --
interface Skill {
  name: string;
  score: number; // 0-100
}

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: Skill[];
  avgScore: number;
}

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Backend Engineer',
    department: 'Engineering',
    skills: [
      { name: 'Rust', score: 92 },
      { name: 'PostgreSQL', score: 88 },
      { name: 'Kubernetes', score: 75 }
    ],
    avgScore: 85
  },
  {
    id: '2',
    name: 'Michael Ross',
    role: 'Product Designer',
    department: 'Design',
    skills: [
      { name: 'Figma', score: 95 },
      { name: 'User Research', score: 82 },
      { name: 'Prototyping', score: 90 }
    ],
    avgScore: 89
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Data Scientist',
    department: 'Data',
    skills: [
      { name: 'Python', score: 94 },
      { name: 'PyTorch', score: 65 },
      { name: 'SQL', score: 88 }
    ],
    avgScore: 82.3
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Frontend Developer',
    department: 'Engineering',
    skills: [
      { name: 'React', score: 85 },
      { name: 'TypeScript', score: 78 },
      { name: 'CSS/Tailwind', score: 91 }
    ],
    avgScore: 84.6
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'DevOps Engineer',
    department: 'Engineering',
    skills: [
      { name: 'AWS', score: 85 },
      { name: 'Terraform', score: 80 },
      { name: 'CI/CD', score: 88 }
    ],
    avgScore: 84.3
  }
];

// -- Helper Functions --
function getScoreColor(score: number): string {
  if (score >= 90) return '#10b981'; // Green
  if (score >= 80) return '#3b82f6'; // Blue
  if (score >= 70) return '#f59e0b'; // Amber
  return '#ef4444'; // Red
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

export default function SkillsPage() {
  const [filterDept, setFilterDept] = useState('All');

  const filteredEmployees = filterDept === 'All' 
    ? MOCK_EMPLOYEES 
    : MOCK_EMPLOYEES.filter(e => e.department === filterDept);

  const departments = ['All', ...Array.from(new Set(MOCK_EMPLOYEES.map(e => e.department)))];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Skill Matrix</h1>
          <p className={styles.subtitle}>Comprehensive view of workforce competencies and proficiency levels.</p>
        </div>
        <Link href="/dashboard/assessments">
          <button className="btn-primary">Add Skill Assessment</button>
        </Link>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <select 
          className={styles.filterSelect}
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept} Department</option>
          ))}
        </select>
        
        {/* Placeholder for more filters */}
        <select className={styles.filterSelect} disabled>
          <option>Role (All)</option>
        </select>
      </div>

      {/* Main Table */}
      <div className={`glass-panel ${styles.tableContainer}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Employee</th>
              <th className={styles.th}>Top Skills</th>
              <th className={styles.th}>Avg. Score</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.employeeInfo}>
                    <div className={styles.avatar}>{getInitials(emp.name)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{emp.name}</div>
                      <div className={styles.role}>{emp.role}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.skillTags}>
                    {emp.skills.map(skill => (
                      <div key={skill.name} className={styles.skillTag}>
                        {skill.name} <span style={{ color: getScoreColor(skill.score), marginLeft: '4px' }}>{skill.score}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className={styles.td}>
                   <div className={styles.scoreBadge} style={{ backgroundColor: `${getScoreColor(emp.avgScore)}20`, color: getScoreColor(emp.avgScore) }}>
                     {emp.avgScore}
                   </div>
                </td>
                <td className={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                     <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Active</span>
                  </div>
                </td>
                <td className={styles.td} style={{ textAlign: 'right' }}>
                  <Link href={`/dashboard/employees/${emp.id}`}>
                    <button style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--primary)', 
                      cursor: 'pointer',
                      fontSize: '14px' 
                    }}>
                      Details &rarr;
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
