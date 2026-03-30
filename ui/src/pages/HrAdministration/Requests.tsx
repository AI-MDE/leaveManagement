import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';

export const AllRequests: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['allLeaveRequests'],
    queryFn: () => leaveRequestApi.getAllForHrAdmin(),
  });

  const filtered = requests.filter(r => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (employeeFilter && !(r as any).employeeName?.toLowerCase().includes(employeeFilter.toLowerCase())) return false;
    return true;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">All Leave Requests</h1>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input type="text" placeholder="Filter by employee..." value={employeeFilter}
          onChange={e => setEmployeeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        {(statusFilter || employeeFilter) && (
          <button onClick={() => { setStatusFilter(''); setEmployeeFilter(''); }}
            className="text-sm text-gray-500 hover:text-gray-700">Clear filters</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
          No leave requests found matching the selected filters.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Leave Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Start</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">End</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Days</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reviewed By</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900">{(r as any).employeeName ?? r.employeeId}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{(r as any).leaveTypeName ?? r.leaveTypeId}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{r.startDate}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{r.endDate}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-semibold">{r.totalDays}</td>
                  <td className="px-6 py-3 text-sm"><StatusBadge status={r.status} /></td>
                  <td className="px-6 py-3 text-sm text-gray-500">{new Date(r.submittedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{(r as any).reviewedByName ?? '—'}</td>
                  <td className="px-6 py-3 text-sm">
                    <Link to={`/hr-administration/requests/${r.id}`} className="text-blue-600 hover:text-blue-800">View Detail</Link>
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

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800', APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800', CANCELLED: 'bg-gray-100 text-gray-800',
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
