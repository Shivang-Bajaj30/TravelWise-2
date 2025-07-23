import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileUserDropdownOpen, setIsMobileUserDropdownOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);

  const location = useLocation();
  const { user, logoutUser, loadingAuth } = useAuth();

  // Type refs with HTMLDivElement and HTMLButtonElement
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string): boolean => location.pathname === path;

  const handleLogout = () => {
    logoutUser();
    setIsDesktopDropdownOpen(false);
    setIsMobileUserDropdownOpen(false);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node) &&
        desktopButtonRef.current &&
        !desktopButtonRef.current.contains(event.target as Node)
      ) {
        setIsDesktopDropdownOpen(false);
      }
    };

    if (isDesktopDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileUserDropdownOpen(false);
      }
    };

    if (isMobileUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileUserDropdownOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setIsMobileUserDropdownOpen(false);
  }, [location.pathname]);

  if (loadingAuth) {
    return null;
  }

  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-100/80 via-white/60 to-red-100/80 border-b border-red-200 shadow-lg backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-19">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-extrabold text-red-700 tracking-tight hover:text-red-500 transition-all duration-300 hover:scale-105"
              >
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

            {/* Desktop Auth Links / User Icon */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4 relative">
              {user ? (
                <>
                  <button
                    ref={desktopButtonRef}
                    onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                    className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label="User menu"
                  >
                    <FaUserCircle className="w-6 h-6" />
                  </button>
                  {isDesktopDropdownOpen && (
                    <div
                      ref={desktopDropdownRef}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-20"
                    >
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        Signed in as: <span className="font-semibold">{user.email}</span>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                        onClick={() => setIsDesktopDropdownOpen(false)}
                      >
                        Profile
                      </Link>
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

            {/* Mobile/Tablet Auth Links and Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className={`px-2 py-1.5 rounded-lg font-semibold border border-red-200 transition-all duration-300 text-xs whitespace-nowrap ${isActive('/login') ? 'bg-red-100 text-red-700 shadow' : 'text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm'}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 shadow-sm text-xs whitespace-nowrap ${isActive('/signup') ? 'bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-white shadow-lg' : 'bg-gradient-to-r from-red-500 via-pink-400 to-red-300 text-white hover:from-red-600 hover:via-pink-500 hover:to-red-400 hover:shadow-lg'}`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative flex-shrink-0">
                  <button
                    ref={mobileButtonRef}
                    onClick={() => setIsMobileUserDropdownOpen(!isMobileUserDropdownOpen)}
                    className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label="User menu"
                  >
                    <FaUserCircle className="w-6 h-6" />
                  </button>
                  {isMobileUserDropdownOpen && (
                    <div
                      ref={mobileDropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10"
                    >
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        Signed in as: <span className="font-semibold">{user.email}</span>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                        onClick={() => setIsMobileUserDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-red-700 hover:text-red-500 focus:outline-none p-2 rounded-lg border border-red-200 shadow-sm transition-all duration-300 bg-white/80"
                aria-label="Toggle menu"
              >
                <FaBars className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-red-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-red-200">
            <Link
              to="/"
              className="text-xl font-extrabold text-red-700 tracking-tight hover:text-red-500"
              onClick={() => setIsDrawerOpen(false)}
            >
              TravelWise
            </Link>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-red-700 hover:text-red-500 p-2 rounded-lg"
              aria-label="Close menu"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-2 p-4 pt-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/destinations') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/packages') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/about') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/contact') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;