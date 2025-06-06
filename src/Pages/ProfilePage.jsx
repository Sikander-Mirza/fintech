import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Moon, Sun, Settings, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import Navbar from '../Components/Navbar';
import profileimg from '../assets/profileimg.png';

const ProfilePage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });

  // ✅ Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ name: parsed.name || 'User', email: parsed.email || '' });
    }
  }, []);

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { icon: <Settings size={20} />, label: 'Settings', onClick: () => {} },
    { icon: <Bell size={20} />, label: 'Notifications', onClick: () => {} },
    { icon: <Shield size={20} />, label: 'Security', onClick: () => {} },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', onClick: () => {} },
    { icon: <LogOut size={20} />, label: 'Logout', onClick: handleLogout },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className={`font-[Montserrat] text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Profile
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
        >
          <div className="flex items-center gap-4">
            <img
              src={profileimg}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <div>
              <h2 className={`font-[Montserrat] text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {user.name}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {user.email}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={item.onClick}
                className={`w-full flex items-center gap-4 p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } transition-colors duration-200`}
              >
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{item.icon}</div>
                <span className={`font-[Montserrat] ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {item.label}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default ProfilePage;
