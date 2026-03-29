import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">
        Leave Management System
      </h2>
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
