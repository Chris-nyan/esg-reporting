import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // 1. While checking the token, show nothing (or a spinner) 
  // to prevent the login page from flashing for a split second.
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // 2. If no user is found, redirect to login
  // 3. If user is found, render the child routes (the 'Outlet')
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}