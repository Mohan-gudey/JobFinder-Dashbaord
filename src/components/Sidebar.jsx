import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { FaLink } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Single set of sidebar links for all users
const SIDEBAR_LINKS = [
  { id: 1, path: '/user', name: 'Dashboard', icon: FaHome },
  { id: 2, path: '/user/urls', name: 'URL', icon: FaLink },
];


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear auth flag
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="w-16 md:w-64 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-blue-500/50 rounded-xl text-black">
      {/* Logo & App Name */}
      <div className="px-5 flex items-center mb-8">
        <h1 className="text-3xl font-semibold ml-3 hidden md:flex">JobFinder</h1>
      </div>

      {/* Navigation Links */}
      <ul className="mt-12 space-y-4">
        {SIDEBAR_LINKS.map((link) => (
          <li key={link.id}>
            <Link
              to={link.path}
              className={`flex items-center justify-center md:justify-start py-3 px-5 rounded-md transition-colors ${
                location.pathname === link.path
                  ? 'bg-white text-blue-500 hover:bg-gray-100/50 hover:text-black'
                  : 'hover:bg-gray-100/50 hover:text-black'
              }`}
            >
              <span className="mr-3">{<link.icon />}</span>
              <span className="hidden md:flex">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-5 w-full px-5">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-md w-full hover:bg-gray-100 hover:text-[#31694a] py-2 px-2 rounded-md"
        >
          <LuLogOut size={20} />
          <span className="hidden md:flex">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;