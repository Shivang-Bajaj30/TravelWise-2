import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { FaUserCircle } from 'react-icons/fa'; //(you might need to install react-icons: npm install react-icons)

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for user dropdown
  const location = useLocation();
  const { user, logoutUser, loadingAuth } = useAuth(); // Get user, logoutUser, and loadingAuth from context

  // Helper to check if link is active
  const isActive = (path: string) => location.pathname === path;

  // Handles logout action
  const handleLogout = () => {
    logoutUser(); // Call logout function from context
    setIsDropdownOpen(false); // Close dropdown on logout
    setIsMobileMenuOpen(false); // Close mobile menu if open
    // You might want to navigate to login or home after logout, e.g.:
    // navigate('/login'); 
  };

  // While authentication state is being loaded (e.g., from localStorage),
  // return null or a loading indicator to prevent UI flickering.
  if (loadingAuth) {
    return null; // Or return a simple loading spinner for the navbar
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-100/80 via-white/60 to-red-100/80 border-b border-red-200 shadow-lg backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-19">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-extrabold text-red-700 tracking-tight hover:text-red-500 transition-all duration-300 hover:scale-105">
              TravelWise
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              to="/"
              className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/destinations') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/packages') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/about') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/contact') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Links / User Icon (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 relative">
            {user ? (
              <>
                {/* User Icon Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                  aria-label="User menu"
                >
                  <FaUserCircle className="w-6 h-6" /> {/* User icon from react-icons */}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-20">
                    {/* User Info */}
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      Signed in as: <span className="font-semibold">{user.email}</span>
                    </div>
                    {/* Profile Link (example) */}
                    <Link
                      to="/profile" // Example link for user profile page
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      onClick={() => { setIsDropdownOpen(false); setIsMobileMenuOpen(false); }}
                    >
                      Profile
                    </Link>
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Auth Links (Login/Signup) when not logged in
              <>
                <Link
                  to="/login"
                  className={`px-2 xl:px-4 py-2 rounded-lg font-semibold border border-red-200 transition-all duration-300 text-xs xl:text-base ${isActive('/login') ? 'bg-red-100 text-red-700 shadow' : 'text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm'}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-3 xl:px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm text-xs xl:text-base ${isActive('/signup') ? 'bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-white shadow-lg' : 'bg-gradient-to-r from-red-500 via-pink-400 to-red-300 text-white hover:from-red-600 hover:via-pink-500 hover:to-red-400 hover:shadow-lg hover:scale-105'}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-red-700 hover:text-red-500 focus:outline-none p-2 rounded-lg border border-red-200 shadow-sm transition-all duration-300 bg-white/80 ${isMobileMenuOpen ? 'ring-2 ring-red-300' : ''}`}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
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
          className={`lg:hidden bg-white/95 backdrop-blur-sm border-b border-red-200 shadow-md transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
          style={{ transitionProperty: 'max-height, opacity' }}
        >
          <div className="flex flex-col gap-3 px-4 py-4 sm:py-6">
            <Link
              to="/"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/destinations') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/packages') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/about') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 border border-transparent ${isActive('/contact') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-red-100 pt-3 mt-2">
              {user ? (
                <>
                  {/* User Info in Mobile Menu */}
                  <div className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">
                    Signed in as: <span className="font-semibold">{user.email}</span>
                  </div>
                  {/* Profile Link (example) */}
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-red-50 rounded-lg"
                    onClick={() => { setIsDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  >
                    Profile
                  </Link>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50 font-semibold rounded-lg mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Auth Links (Login/Signup) in Mobile Menu when not logged in
                <>
                  <Link
                    to="/login"
                    className={`font-semibold px-3 py-2.5 rounded-lg border border-red-200 transition-all duration-300 block text-center ${isActive('/login') ? 'bg-red-100 text-red-700 shadow' : 'text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`font-semibold px-5 py-2.5 rounded-lg text-center transition-all duration-300 shadow-sm block mt-3 ${isActive('/signup') ? 'bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-white shadow-lg' : 'bg-gradient-to-r from-red-500 via-pink-400 to-red-300 text-white hover:from-red-600 hover:via-pink-500 hover:to-red-400 hover:shadow-lg'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
