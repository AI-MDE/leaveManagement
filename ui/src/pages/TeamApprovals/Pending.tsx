import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';

export const PendingRequests: React.FC = () => {
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['pendingRequests'],
    queryFn: () => leaveRequestApi.getPendingForManager(),
  });

  const filteredRequests = requests.filter((request) => request.status === 'PENDING');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Pending Requests</h1>

      {/* Empty State */}
      {filteredRequests.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
          <p>No pending requests. All leave requests from your team have been reviewed.</p>
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
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <Link
                      to={`/team-approvals/pending/${request.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Review
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
