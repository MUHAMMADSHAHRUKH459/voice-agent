'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AdminPanel } from '@/components/admin/admin-panel';

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated or non-admin users
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push(user ? '/dashboard' : '/auth');
    }
  }, [isLoading, user, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Block unauthorized render
  if (!user || user.role !== 'admin') return null;

  return (
    <DashboardLayout>
      <AdminPanel />
    </DashboardLayout>
  );
}
