"use client";

import React from 'react';
import Link from 'next/link';

const EMPLOYEES = [
  { id: 1, name: "Sarah Chen", role: "Senior Backend Engineer", dept: "Engineering", email: "sarah.c@axiom.co", joined: "Mar 2024" },
  { id: 2, name: "Michael Ross", role: "Product Designer", dept: "Design", email: "m.ross@axiom.co", joined: "Jun 2024" },
  { id: 3, name: "James Wilson", role: "Data Scientist", dept: "Data", email: "j.wilson@axiom.co", joined: "Jan 2025" },
  { id: 4, name: "Emily Davis", role: "Frontend Developer", dept: "Engineering", email: "e.davis@axiom.co", joined: "Aug 2024" },
  { id: 5, name: "David Kim", role: "DevOps Engineer", dept: "Engineering", email: "d.kim@axiom.co", joined: "Feb 2025" }
];

export default function EmployeesPage() {
  return (
    <div>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Workforce Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage employee profiles and access rights.</p>
        </div>
        <button className="btn-primary">Add Employee</button>
      </header>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Role</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Department</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Email</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Joined</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map(emp => (
              <tr key={emp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                       {emp.name[0]}
                     </div>
                     <span style={{ fontWeight: 600 }}>{emp.name}</span>
                  </div>
                </td>
                <td style={{ padding: '20px 24px', color: 'var(--text-muted)' }}>{emp.role}</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '12px' }}>
                    {emp.dept}
                  </span>
                </td>
                <td style={{ padding: '20px 24px', color: 'var(--text-muted)', fontSize: '14px' }}>{emp.email}</td>
                <td style={{ padding: '20px 24px', color: 'var(--text-muted)', fontSize: '14px' }}>{emp.joined}</td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                   <Link href={`/dashboard/employees/${emp.id}`}>
                     <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>View Profile</button>
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
