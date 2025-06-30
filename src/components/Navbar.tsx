import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-19 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-19">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight hover:text-green-600 transition-all duration-300 hover:scale-105">
              TravelWise
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/destinations') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/packages') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/about') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/contact') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg font-semibold border border-blue-100 transition-all duration-300 ${isActive('/login') ? 'bg-blue-50 text-blue-700 shadow' : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm'}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm ${isActive('/signup') ? 'bg-green-600 text-white shadow-lg' : 'bg-blue-600 text-white hover:bg-green-600 hover:shadow-lg hover:scale-105'}`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 bg-white ${isMobileMenuOpen ? 'ring-2 ring-blue-200' : ''}`}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white border-b border-gray-200 shadow-md transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
          style={{ transitionProperty: 'max-height, opacity' }}
        >
          <div className="flex flex-col gap-4 px-4 py-6">
            <Link
              to="/"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/destinations') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/packages') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/about') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/contact') ? 'bg-blue-50 text-blue-700 shadow' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className={`font-semibold px-3 py-2 rounded-lg border border-blue-100 transition-all duration-300 ${isActive('/login') ? 'bg-blue-50 text-blue-700 shadow' : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`font-semibold px-5 py-2 rounded-lg text-center transition-all duration-300 shadow-sm ${isActive('/signup') ? 'bg-green-600 text-white shadow-lg' : 'bg-blue-600 text-white hover:bg-green-600 hover:shadow-lg'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;