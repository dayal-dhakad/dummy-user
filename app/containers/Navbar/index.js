import { postReq, removeAuthCookie } from '@/utils/apiHandlers';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await postReq('/auth/logout');
      const { status } = res;
      if (status) {
        removeAuthCookie();
        navigate('/login');
        toast.success('Log out successfully');
      } else if (!status) {
        removeAuthCookie();
        navigate('/login');
        toast.success('Log out successfully');
      }
    } catch (error) {
      toast.error(error);
      console.log(error, 'error in handle logout');
    }
  };
  return (
    <nav className="container border-b border-gray-500 py-3">
      <div className="flex items-center justify-between">
        <div className="h-[70px] w-[70px]">
          <img
            className="h-full w-full object-cover"
            src="/images/logoVista.png"
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
