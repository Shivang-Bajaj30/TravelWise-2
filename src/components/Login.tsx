import { useState } from 'react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Please enter both email and password' });
      return;
    }
    setLoading(true);
    if (formData.email === 'demo@example.com' && formData.password === 'password123') {
      setMessage({ type: 'success', text: 'Login successful!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 1000);
    } else {
      setMessage({ type: 'error', text: 'Login failed. Please use the demo account.' });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="bg-black bg-opacity-85 p-10 rounded-xl w-full max-w-md shadow text-center text-white">
        <h1 className="text-2xl mb-2">Welcome Back! 👋</h1>
        <p className="mb-5">Log in to continue your journey</p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="text-left mb-4">
            <label className="block mb-1" htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
              id="email"
              type="email"
              disabled={loading}
              className="w-full p-3 rounded bg-white bg-opacity-90 text-black"
            />
          </div>
          <div className="text-left mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              name="password"
              id="password"
              type="password"
              disabled={loading}
              className="w-full p-3 rounded bg-white bg-opacity-90 text-black"
            />
          </div>
          <div className="text-xs text-red-600 font-bold text-center my-2">
            Use this account: demo@example.com / password123
          </div>
          {message.text && (
            <div className={`rounded p-3 mb-3 text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700 border-l-4 border-red-700' : 'bg-green-100 text-green-700 border-l-4 border-green-700'}`}>
              {message.text}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 rounded px-6 py-3 text-white font-bold mt-2"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="text-sm mt-5">Don't have an account? <span className="text-green-400 underline cursor-pointer">Sign up</span></p>
      </div>
    </div>
  );
};

export default Login; 