import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        padding: '40px',
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, #1a202c 0%, var(--bg-core) 40%)'
      }}>
        {children}
      </main>
    </div>
  );
}
