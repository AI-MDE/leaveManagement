import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveBalanceApi } from '@api/leave-balance';
import { leaveRequestApi } from '@api/leave-request';

export const Dashboard: React.FC = () => {
  const { data: balances = [], isLoading: loadingBalances } = useQuery({
    queryKey: ['leaveBalanceSummary'],
    queryFn: () => leaveBalanceApi.getSummary(),
  });

  const { data: activeRequests = [], isLoading: loadingRequests } = useQuery({
    queryKey: ['myLeaveRequests'],
    queryFn: async () => {
      const allRequests = await leaveRequestApi.getByEmployee();
      return allRequests.filter(r => r.status === 'PENDING' || r.status === 'APPROVED');
    },
  });

  if (loadingBalances || loadingRequests) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Leave</h1>
        <Link
          to="/my-leave/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Request
        </Link>
      </div>

      {/* Leave Balance Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave Balances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {balances.map((balance) => (
            <div key={balance.leaveTypeId} className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900">{balance.leaveTypeName}</h3>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-600">
                  Total: <span className="font-semibold">{balance.totalDays}</span>
                </p>
                <p className="text-gray-600">
                  Used: <span className="font-semibold text-orange-600">{balance.usedDays}</span>
                </p>
                <p className="text-gray-600">
                  Pending: <span className="font-semibold text-yellow-600">{balance.pendingDays}</span>
                </p>
                <p className="text-gray-900 border-t pt-2">
                  Available: <span className="font-bold text-green-600">{balance.availableDays}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Requests */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Requests</h2>
        {activeRequests.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
            <p>You have no active leave requests. Click 'New Request' to submit one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">End Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Days</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {activeRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">{request.leaveTypeId}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{request.startDate}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{request.endDate}</td>
                    <td className="px-6 py-3 text-sm text-gray-900 font-semibold">{request.totalDays}</td>
                    <td className="px-6 py-3 text-sm">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <Link
                        to={`/my-leave/requests/${request.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link
          to="/my-leave/requests"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          View All Requests →
        </Link>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
