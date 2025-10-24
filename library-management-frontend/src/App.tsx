import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';

interface User {
  email: string;
  role: 'admin' | 'user';
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, role: 'admin' | 'user') => {
    setUser({ email, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard userEmail={user.email} onLogout={handleLogout} />;
  }

  return <UserDashboard userEmail={user.email} onLogout={handleLogout} />;
}