"use client";

import { useAuth } from '@/hooks/use-auth';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { FacultyDashboard } from '@/components/dashboard/faculty-dashboard';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading spinner
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <div>Invalid user role.</div>;
    }
  };

  return <>{renderDashboard()}</>;
}
