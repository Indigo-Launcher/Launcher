import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ username, password });
      navigate('/onboarding/welcome');
    } catch (error) {
      setError(error.message || 'Could not connect to server. Is the API running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="iris-glow h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#0a0a14' }}
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/Icons/logo.png"
            alt="Indigo Launcher"
            className="w-16 h-16 rounded-full object-cover mb-4"
          />
          <h1 className="text-2xl font-bold text-white">
            Indigo<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Your games. One place. Zero hassle.</p>
        </div>

        <div className="card w-[380px] p-8">
          <h2 className="text-lg font-bold text-white text-center mb-6">Welcome Back!</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#1f1f33] border border-[#2a2a40] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1f1f33] border border-[#2a2a40] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 py-3 text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p className="text-center text-xs text-zinc-500 mt-5 tracking-wide uppercase">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
