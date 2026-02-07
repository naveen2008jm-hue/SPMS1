"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Skill Matrix', path: '/dashboard/skills' },
  { name: 'Employees', path: '/dashboard/employees' },
  { name: 'Recruitment', path: '/dashboard/recruitment' },
  { name: 'Assessments', path: '/dashboard/assessments' },
  { name: 'AI Coaching', path: '/dashboard/coaching' },
  { name: 'ROI Analysis', path: '/dashboard/roi' },
  { name: 'Settings', path: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        AXIOM <span className={styles.logoAccent}>.</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {/* Placeholder for Icon */}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.profile}>
        <div className={styles.avatar}>JD</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>John Doe</span>
          <span className={styles.userRole}>HR Director</span>
        </div>
      </div>
    </aside>
  );
}
