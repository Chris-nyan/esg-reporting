import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login.jsx'; 
import MainLayout from '@/layouts/MainLayout.jsx';
import ProtectedRoute from '@/components/shared/ProtectedRoute.jsx';

// Placeholder Pages for your ESG features
const Dashboard = () => <div className="p-6 text-2xl font-bold">Dashboard Overview</div>;
const Reports = () => <div className="p-6 text-2xl font-bold">Sustainability Reports</div>;
const Settings = () => <div className="p-6 text-2xl font-bold">Platform Settings</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Public Route: Login Page */}
        <Route path="/login" element={<Login />} />

        {/* 2. Protected Routes: Only accessible after Google/Manual Login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 3. Fallback: Catch-all redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Fixed the typo here:
export default App;