import { useState } from 'react';
import { signup } from '../lib/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);

    try {
      const response = await signup({
        name: username,
        email,
        password
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Account created successfully! Redirecting to login...'
        });

        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        const errorText = await response.text();
        setMessage({
          type: 'error',
          text: errorText || 'Failed to create account. Please try again.'
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to create account. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-0"
      style={{
        backgroundImage: 'url(/images/signup.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '89.1vh',
        marginTop: '-4px'
      }}>
      <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center">
        <div className="relative z-10 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-2xl text-center text-white flex flex-col justify-center w-full" style={{ minHeight: '300px' }}>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-2 text-red-600 drop-shadow">Create Account 🚀</h1>
          <p className="mb-3 text-sm sm:text-base text-black">Join us and start planning your adventures!</p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="text-left mb-1">
              <label className="block mb-1 font-semibold text-blue-600">Username</label>
              <input
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                name="username"
                id="username"
                type="text"
                disabled={loading}
                className="w-full p-2 rounded-lg bg-white bg-opacity-80 text-black border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base transition-colors duration-200 hover:bg-blue-50 focus:border-blue-400"
              />
            </div>

            <div className="text-left mb-1">
              <label className="block mb-1 font-semibold text-blue-600">Email</label>
              <input
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                name="email"
                id="email"
                type="email"
                disabled={loading}
                className="w-full p-2 rounded-lg bg-white bg-opacity-80 text-black border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base transition-colors duration-200 hover:bg-blue-50 focus:border-blue-400"
              />
            </div>

            <div className="text-left mb-1">
              <label className="block mb-1 font-semibold text-blue-600">Password</label>
              <input
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                name="password"
                id="password"
                type="password"
                disabled={loading}
                className="w-full p-2 rounded-lg bg-white bg-opacity-80 text-black border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base transition-colors duration-200 hover:bg-blue-50 focus:border-blue-400"
              />
            </div>

            <div className="text-left mb-1">
              <label className="block mb-1 font-semibold text-blue-600">Confirm Password</label>
              <input
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                disabled={loading}
                className="w-full p-2 rounded-lg bg-white bg-opacity-80 text-black border border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base transition-colors duration-200 hover:bg-blue-50 focus:border-blue-400"
              />
            </div>

            {message.text && (
              <div className={`rounded p-2 mb-2 text-sm font-medium ${message.type === 'error'
                ? 'bg-red-100 text-red-700 border-l-4 border-red-700'
                : message.type === 'success'
                  ? 'bg-green-100 text-green-700 border-l-4 border-green-700'
                  : 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-700'
                }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 hover:from-blue-700 hover:via-purple-600 hover:to-blue-500 rounded-lg px-6 py-2 text-white font-bold mt-1 shadow-lg focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-base border-none outline-none"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm mt-3 text-black">
            Already have an account? <a href="/login" className="text-blue-600 underline font-semibold">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;