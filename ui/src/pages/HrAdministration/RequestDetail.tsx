import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { auditApi } from '@api/audit';

export const HrRequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { data: request, isLoading } = useQuery({
    queryKey: ['leaveRequest', id],
    queryFn: () => leaveRequestApi.getById(id!),
  });

  const { data: auditEntries = [] } = useQuery({
    queryKey: ['auditTrail', id],
    queryFn: () => auditApi.getByRequestId(id!),
    enabled: !!id,
  });

  const cancelMutation = useMutation({
    mutationFn: () => leaveRequestApi.cancel(id!),
    onSuccess: () => navigate('/hr-administration/requests'),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!request) return <div className="text-center text-gray-600 py-12">Request not found.</div>;

  const canCancel = request.status === 'PENDING' || request.status === 'APPROVED';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Leave Request Detail</h1>
        <button onClick={() => navigate('/hr-administration/requests')} className="text-blue-600 hover:text-blue-800">
          ← Back to All Requests
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <Field label="Employee" value={`${request.employeeName} (${(request as any).employeeEmail ?? ''})`} />
          <Field label="Leave Type" value={request.leaveTypeName} />
          <Field label="Start Date" value={request.startDate} />
          <Field label="End Date" value={request.endDate} />
          <Field label="Total Days" value={String(request.totalDays)} />
          <Field label="Status" value={<StatusBadge status={request.status} />} />
          <Field label="Version" value={String(request.version)} />
          <Field label="Submitted At" value={new Date(request.submittedAt).toLocaleString()} />
          {request.reason && <Field label="Reason" value={request.reason} className="col-span-2" />}
          {request.managerComment && <Field label="Manager Comment" value={request.managerComment} className="col-span-2" />}
        </div>

        {canCancel && (
          <div className="mt-6 pt-6 border-t">
            <button onClick={() => setShowCancelConfirm(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm">
              Override Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Trail</h2>
        {auditEntries.length === 0 ? (
          <p className="text-gray-500 text-sm">No audit entries found.</p>
        ) : (
          <ol className="space-y-4">
            {auditEntries.map(entry => (
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

      {/* Confirm Cancel Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Override Cancel</h3>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to cancel this leave request? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => cancelMutation.mutate()} disabled={cancelMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-semibold text-sm transition">
                {cancelMutation.isPending ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
              <button onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-sm transition">
                No, Keep
              </button>
            </div>
          </div>
        </div>
      )}
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
  const colors: Record<string, string> = { PENDING: 'bg-yellow-100 text-yellow-800', APPROVED: 'bg-green-100 text-green-800', REJECTED: 'bg-red-100 text-red-800', CANCELLED: 'bg-gray-100 text-gray-800' };
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
