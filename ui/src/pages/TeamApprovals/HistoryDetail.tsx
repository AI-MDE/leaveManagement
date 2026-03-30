import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { auditApi } from '@api/audit';

export const HistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: request, isLoading } = useQuery({
    queryKey: ['leaveRequest', id],
    queryFn: () => leaveRequestApi.getById(id!),
  });

  const { data: auditEntries = [] } = useQuery({
    queryKey: ['auditTrail', id],
    queryFn: () => auditApi.getByRequestId(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!request) return <div className="text-center text-gray-600 py-12">Request not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Request History Detail</h1>
        <button onClick={() => navigate('/team-approvals/history')} className="text-blue-600 hover:text-blue-800">
          ← Back to Team History
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <Field label="Employee" value={request.employeeName} />
          <Field label="Leave Type" value={request.leaveTypeName} />
          <Field label="Start Date" value={request.startDate} />
          <Field label="End Date" value={request.endDate} />
          <Field label="Total Days" value={String(request.totalDays)} />
          <Field label="Status" value={<StatusBadge status={request.status} />} />
          {request.reason && <Field label="Reason" value={request.reason} className="col-span-2" />}
          {request.managerComment && <Field label="Manager Comment" value={request.managerComment} className="col-span-2" />}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Trail</h2>
        {auditEntries.length === 0 ? (
          <p className="text-gray-500 text-sm">No audit entries found.</p>
        ) : (
          <ol className="space-y-4">
            {auditEntries.map((entry) => (
              <li key={entry.id} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{entry.action}</p>
                  <p className="text-xs text-gray-500">{entry.actorName} · {new Date(entry.occurredAt).toLocaleString()}</p>
                  {(entry.fromStatus || entry.toStatus) && (
                    <p className="text-xs text-gray-500">{entry.fromStatus} → {entry.toStatus}</p>
                  )}
                  {entry.comment && <p className="text-sm text-gray-700 mt-1 italic">"{entry.comment}"</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className = '' }) => (
  <div className={className}>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <div className="mt-1 text-gray-900">{value}</div>
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
