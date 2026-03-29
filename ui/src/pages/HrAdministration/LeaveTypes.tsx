import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveTypeApi } from '@api/leave-type';

export const LeaveTypes: React.FC = () => {
  const [filterActive, setFilterActive] = useState(true);

  const { data: allLeaveTypes = [], isLoading } = useQuery({
    queryKey: ['allLeaveTypes'],
    queryFn: () => leaveTypeApi.getAll(),
  });

  const filteredLeaveTypes = allLeaveTypes.filter((lt) => {
    if (filterActive) return lt.isActive;
    return !lt.isActive;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Leave Types</h1>
        <Link
          to="/hr-administration/leave-types/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Leave Type
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterActive}
            onChange={(e) => setFilterActive(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">Active Only</span>
        </label>
      </div>

      {/* Leave Types Table */}
      {filteredLeaveTypes.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
          <p>No leave types configured. Click 'New Leave Type' to add one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Advance Notice Days</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Requires Balance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLeaveTypes.map((leaveType) => (
                <tr key={leaveType.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">{leaveType.code}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{leaveType.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{leaveType.advanceNoticeDays} day(s)</td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {leaveType.requiresBalance ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        leaveType.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {leaveType.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm space-x-2">
                    <Link
                      to={`/hr-administration/leave-types/${leaveType.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
