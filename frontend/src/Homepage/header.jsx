import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRecycle, FaUser, FaBars, FaTimes, FaGlobe, 
  FaSun, FaMoon, FaBell, FaSearch, FaMapMarkerAlt,
  FaTruck, FaChartLine, FaLeaf, FaHandHoldingHeart
} from 'react-icons/fa';
import { useAppContext } from '../Context/context';
import SearchBar from './search_bar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { 
    user, 
    isAuthenticated, 
    logout, 
    theme, 
    setTheme, 
    language, 
    setLanguage,
    notifications,
    clearNotifications,
    wasteStats
  } = useAppContext();
  
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: language === 'bn' ? 'হোম' : 'Home', path: '/', icon: FaLeaf },
    { name: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About', path: '/about', icon: FaHandHoldingHeart },
    { name: language === 'bn' ? 'পরিষেবা' : 'Services', path: '/services', icon: FaRecycle },
    { name: language === 'bn' ? 'কিভাবে কাজ করে' : 'How It Works', path: '/how-it-works', icon: FaChartLine },
    { name: language === 'bn' ? 'যোগাযোগ' : 'Contact', path: '/contact', icon: FaMapMarkerAlt }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"
            >
              <FaRecycle className="text-white text-xl" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Porichhonno
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                {language === 'bn' ? 'পরিচ্ছন্নতা, প্রযুক্তি, প্রগতি' : 'Cleanliness, Technology, Progress'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors relative group"
              >
                <link.icon className="text-sm" />
                <span>{link.name}</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Stats Badge */}
            {isAuthenticated && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden lg:flex items-center space-x-2 bg-primary-50 px-3 py-1.5 rounded-full"
              >
                <FaLeaf className="text-primary-500" />
                <span className="text-sm font-medium text-primary-700">
                  {wasteStats.points} pts
                </span>
              </motion.div>
            )}

            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <FaSearch className="text-gray-600 text-lg" />
              {showSearch && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
            >
              {theme === 'light' ? (
                <FaMoon className="text-gray-600" />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
            >
              <FaGlobe className="text-gray-600" />
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  <FaBell className="text-gray-600 text-lg" />
                  {notifications.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {notifications.length}
                    </motion.span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex justify-between items-center">
                        <span className="font-semibold">Notifications</span>
                        <button
                          onClick={clearNotifications}
                          className="text-xs hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif, index) => (
                            <motion.div
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                            >
                              <p className="text-sm text-gray-800">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </motion.div>
                          ))
                        ) : (
                          <p className="p-4 text-center text-gray-500">
                            No new notifications
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-medium">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/earnings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Earnings
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {language === 'bn' ? 'লগইন' : 'Login'}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
                >
                  {language === 'bn' ? 'রেজিস্টার' : 'Register'}
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <SearchBar onClose={() => setShowSearch(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    >
                      <link.icon />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {isAuthenticated ? (
                  <>
                    <hr className="my-2" />
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 rounded-lg"
                    >
                      <FaChartLine />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 rounded-lg"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="pt-4 space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-center bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-center border-2 border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;