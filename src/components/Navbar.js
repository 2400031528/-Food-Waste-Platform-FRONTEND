import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getUserFromStorage } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, handleLogout } = useContext(AuthContext);
  const stored = getUserFromStorage();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Food Waste Platform
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
          {auth?.token && <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white">Dashboard</Link>}
          {auth?.token && <Link to="/food" className="hover:text-slate-900 dark:hover:text-white">Food Listings</Link>}
          {auth?.token && auth?.user?.role === 'donor' && <Link to="/food/add" className="hover:text-slate-900 dark:hover:text-white">Add Food</Link>}
          {auth?.token && <Link to="/requests" className="hover:text-slate-900 dark:hover:text-white">Requests</Link>}
          {auth?.token && (auth?.user?.role === 'admin' || auth?.user?.role === 'analyst') && (
            <Link to="/analytics" className="hover:text-slate-900 dark:hover:text-white">Analytics</Link>
          )}
          {!auth?.token && <Link to="/login" className="rounded-full bg-slate-900 px-4 py-2 text-white">Login</Link>}
          {!auth?.token && <Link to="/register" className="rounded-full border border-slate-900 px-4 py-2 text-slate-900 dark:border-slate-100 dark:text-slate-100">Register</Link>}
          {auth?.token && (
            <button onClick={logout} className="rounded-full bg-slate-900 px-4 py-2 text-white">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
