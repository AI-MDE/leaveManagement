import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import type { LeaveRequestStatus } from '../../types/LeaveRequest';

export const TeamLeaveHistory: React.FC = () => {
  const [filters, setFilters] = useState({
    employee: '',
    status: '' as LeaveRequestStatus | '',
    leaveType: '',
    dateRange: '',
  });

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['teamHistory'],
    queryFn: () => leaveRequestApi.getAllForHrAdmin(),
  });

  const filteredRequests = requests.filter((request) => {
    if (filters.status && request.status !== filters.status) return false;
    return true;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Team Leave History</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as LeaveRequestStatus | '' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* History List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
          <p>No leave history found for your team with the selected filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Start Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">End Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Days</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900">{request.employeeId}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{request.leaveTypeId}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{request.startDate}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{request.endDate}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-semibold">{request.totalDays}</td>
                  <td className="px-6 py-3 text-sm">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <Link
                      to={`/team-approvals/history/${request.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View Detail
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

const StatusBadge: React.FC<{ status: LeaveRequestStatus }> = ({ status }) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
