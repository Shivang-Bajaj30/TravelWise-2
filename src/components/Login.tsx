import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });
  const loading = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({
      type: 'info',
      text: 'Demo login: demo@example.com / password123'
    });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center fixed inset-0 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-0 overflow-hidden" style={{ height: '100vh' }}>
      <div className="relative w-full max-w-2xl mx-auto h-[520px] flex items-center justify-center">
        {/* Hero background image with overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
          <img src="/images/bg1.jpg" alt="Login" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative z-10 p-8 sm:p-10 rounded-2xl shadow-lg backdrop-blur-md bg-white bg-opacity-80 text-center text-gray-900 flex flex-col justify-center w-full h-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-blue-700 drop-shadow">Sign In 🔑</h1>
          <p className="mb-3 text-base sm:text-lg text-gray-700">Welcome back! Log in to continue planning your adventures.</p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit} style={{ flex: 1, justifyContent: 'center' }}>
            <div className="text-left mb-1">
              <label className="block mb-1 font-semibold text-blue-700" htmlFor="email">Email</label>
              <input
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                name="email"
                id="email"
                type="email"
                disabled={loading}
                className="w-full p-2 rounded-lg bg-white bg-opacity-90 text-gray-900 border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              />
            </div>
            <div className="text-left mb-1">
              <label className="block mb-1 font-semibold text-blue-700" htmlFor="password">Password</label>
              <input
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                name="password"
                id="password"
                type="password"
                disabled={loading}
                className="w-full p-2 rounded-lg bg-white bg-opacity-90 text-gray-900 border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              />
            </div>
            {message.text && (
              <div className={`rounded p-2 mb-2 text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700 border-l-4 border-red-700' : message.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-700' : 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-700'}`}>
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg px-6 py-2 text-white font-bold mt-1 shadow hover:from-green-600 hover:to-blue-600 transition-colors duration-200 text-base"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-sm mt-3 text-gray-700">Don't have an account? <a href="/signup" className="text-blue-600 underline font-semibold">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;