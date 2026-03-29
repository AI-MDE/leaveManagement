import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

const MENU_ITEMS = [
  { label: 'My Leave', icon: '📅', route: '/my-leave/dashboard', roles: ['EMPLOYEE', 'MANAGER', 'HR_ADMIN'] },
  { label: 'Team Approvals', icon: '👥', route: '/team-approvals/pending', roles: ['MANAGER', 'HR_ADMIN'] },
  { label: 'HR Administration', icon: '📋', route: '/hr-administration/leave-types', roles: ['HR_ADMIN'] },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const visibleMenuItems = MENU_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Leave Mgmt</h1>
        <p className="text-gray-400 text-sm">{user?.name}</p>
      </div>

      <nav className="space-y-2">
        {visibleMenuItems.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className={`block px-4 py-2 rounded-lg transition ${
              location.pathname.startsWith(item.route.split('/').slice(0, -1).join('/'))
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
