import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { auditApi } from '@api/audit';

export const AuditTrail: React.FC = () => {
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['allAuditEntries'],
    queryFn: () => auditApi.getAll(),
  });

  const filtered = entries.filter(e => {
    if (actionFilter && e.action !== actionFilter) return false;
    if (employeeFilter && !(e as any).employeeName?.toLowerCase().includes(employeeFilter.toLowerCase())) return false;
    return true;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Audit Trail</h1>

      <div className="flex gap-4 flex-wrap">
        <input type="text" placeholder="Filter by employee..." value={employeeFilter}
          onChange={e => setEmployeeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm" />
        <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm">
          <option value="">All Actions</option>
          {['SUBMITTED','APPROVED','REJECTED','CANCELLED','MODIFIED','BALANCE_RESTORED'].map(a =>
            <option key={a} value={a}>{a}</option>)}
        </select>
        {(employeeFilter || actionFilter) && (
          <button onClick={() => { setEmployeeFilter(''); setActionFilter(''); }}
            className="text-sm text-gray-500 hover:text-gray-700">Clear filters</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
          No audit entries found matching the selected filters.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Occurred At</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">From → To</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Comment</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Request</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-xs text-gray-500">{new Date(e.occurredAt).toLocaleString()}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{e.actorName}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{e.action}</span>
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-500">{e.fromStatus ?? '—'} → {e.toStatus ?? '—'}</td>
                  <td className="px-6 py-3 text-sm text-gray-600 italic">{e.comment ?? '—'}</td>
                  <td className="px-6 py-3 text-sm">
                    <Link to={`/hr-administration/requests/${e.leaveRequestId}`} className="text-blue-600 hover:text-blue-800 text-xs">
                      View Request
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
