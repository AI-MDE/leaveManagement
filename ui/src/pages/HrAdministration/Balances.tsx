import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { leaveBalanceApi } from '@api/leave-balance';

export const EmployeeBalances: React.FC = () => {
  const { data: balances = [], isLoading } = useQuery({
    queryKey: ['allLeaveBalances'],
    queryFn: () => leaveBalanceApi.getAll(),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Employee Leave Balances</h1>

      {/* Balances Table */}
      {balances.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
          <p>No leave balances found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Leave Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total Days</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Used Days</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Pending Days</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Available Days</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {balances.map((balance) => (
                <tr key={balance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900">{balance.employeeId}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{balance.leaveTypeId}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{balance.periodYear}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-semibold">{balance.totalDays}</td>
                  <td className="px-6 py-3 text-sm text-orange-600 font-semibold">{balance.usedDays}</td>
                  <td className="px-6 py-3 text-sm text-yellow-600 font-semibold">{balance.pendingDays}</td>
                  <td className="px-6 py-3 text-sm text-green-600 font-semibold">
                    {balance.totalDays - balance.usedDays - balance.pendingDays}
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
