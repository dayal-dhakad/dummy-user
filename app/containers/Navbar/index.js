import { removeAuthCookie } from '@/utils/apiHandlers';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    removeAuthCookie();
    navigate('/login');
    toast.success('Log out successfully');
  };
  return (
    <nav className="container border-b border-gray-500 py-3">
      <div className="flex items-center justify-between">
        <div className="h-[100px] w-[100px]">
          <img
            className="h-full w-full object-cover"
            src="/images/vistaImg.png"
            alt="logo"
          />
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="bg-gray-300 rounded-md py-2 px-5 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
