import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FoodListings from './pages/FoodListings';
import AddFood from './pages/AddFood';
import Requests from './pages/Requests';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { AuthContext } from './contexts/AuthContext';
import { getUserFromStorage } from './utils/auth';

function App() {
  const [auth, setAuth] = useState({ user: null, token: null });

  useEffect(() => {
    const stored = getUserFromStorage();
    if (stored) {
      setAuth(stored);
    }
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem('fw_user', JSON.stringify(data));
    setAuth(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('fw_user');
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Router>
          <Navbar />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={auth?.token ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/food" element={auth?.token ? <FoodListings /> : <Navigate to="/login" />} />
              <Route path="/food/add" element={auth?.token ? <AddFood /> : <Navigate to="/login" />} />
              <Route path="/requests" element={auth?.token ? <Requests /> : <Navigate to="/login" />} />
              <Route path="/analytics" element={auth?.token ? <Analytics /> : <Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
