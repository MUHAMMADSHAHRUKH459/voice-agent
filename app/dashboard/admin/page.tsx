'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(
  () => import('@/components/admin/admin-panel').then(mod => mod.AdminPanel),
  { 
    loading: () => <div>Loading admin panel...</div>,
    ssr: false
  }
);

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      const authorized = Boolean(user && user.role === 'admin');
      setIsAuthorized(authorized);
      if (!authorized) {
        router.push(user ? '/dashboard' : '/auth');
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <DashboardLayout>
      <AdminPanel />
    </DashboardLayout>
  );
}