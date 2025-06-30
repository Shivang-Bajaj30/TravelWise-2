import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      text: 'For testing, please use the demo account from the login page instead of creating a new account.'
    });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="bg-black bg-opacity-85 p-10 rounded-xl w-full max-w-md shadow text-center text-white">
        <h1 className="text-2xl mb-2">Create Account 🚀</h1>
        <p className="mb-5">Join us and start planning your adventures!</p>
        <div className="bg-red-100 border border-red-300 rounded p-4 mb-6 text-red-800">
          <div className="font-bold">For testing purposes:</div>
          <div>Please use our demo account instead of creating a new one.</div>
          <div className="font-bold mt-2">demo@example.com / password123</div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="text-left mb-4">
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              name="name"
              id="name"
              type="text"
              disabled={loading}
              className="w-full p-3 rounded bg-white bg-opacity-90 text-black"
            />
          </div>
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
          <div className="text-left mb-4">
            <label className="block mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              disabled={loading}
              className="w-full p-3 rounded bg-white bg-opacity-90 text-black"
            />
          </div>
          {message.text && (
            <div className={`rounded p-3 mb-3 text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700 border-l-4 border-red-700' : message.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-700' : 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-700'}`}>
              {message.text}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 rounded px-6 py-3 text-white font-bold mt-2"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm mt-5">Already have an account? <span className="text-green-400 underline cursor-pointer">Log in</span></p>
      </div>
    </div>
  );
};

export default SignUp; 