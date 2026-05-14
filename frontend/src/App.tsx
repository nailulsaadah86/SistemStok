import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import GudangDashboard from './pages/GudangDashboard';

export interface User {
  token: string;
  role: string;
  username: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    if (token && role && username) {
      setUser({ token, role, username });
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('token', userData.accessToken);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('username', userData.username);
    setUser({ token: userData.accessToken, role: userData.role, username: userData.username });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (loading) return <div className="flex justify-center items-center" style={{height:'100vh'}}>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !user ? <Login onLogin={handleLogin} /> : 
          <Navigate to={user.role === 'admin' ? '/admin' : '/gudang'} />
        } />

        <Route path="/admin/*" element={
          user?.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> 
          : <Navigate to="/login" />
        } />

        <Route path="/gudang/*" element={
          user?.role === 'gudang' ? <GudangDashboard user={user} onLogout={handleLogout} /> 
          : <Navigate to="/login" />
        } />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
