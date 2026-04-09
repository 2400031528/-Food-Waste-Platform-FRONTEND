import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(form);
      handleLogin(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="card">
        <h1 className="text-3xl font-semibold">Login</h1>
        {error && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm">
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          <label className="block space-y-2 text-sm">
            <span>Password</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          <button type="submit" className="w-full rounded-full bg-slate-900 px-4 py-3 text-white">Sign in</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
