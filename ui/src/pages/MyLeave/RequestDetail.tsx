import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { auditApi } from '@api/audit';

export const RequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { data: request, isLoading } = useQuery({
    queryKey: ['leaveRequest', id],
    queryFn: () => leaveRequestApi.getById(id!),
  });

  const { data: auditTrail = [] } = useQuery({
    queryKey: ['requestAudit', id],
    queryFn: () => auditApi.getByRequestId(id!),
  });

  const cancelMutation = useMutation({
    mutationFn: () => leaveRequestApi.cancel(id!),
    onSuccess: () => {
      navigate('/my-leave/requests');
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!request) {
    return <div className="text-center text-gray-600">Request not found</div>;
  }

  const canCancel = request.status === 'PENDING' || request.status === 'APPROVED';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Leave Request Details</h1>
        <button
          onClick={() => navigate('/my-leave/requests')}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to My Requests
        </button>
      </div>

      {/* Request Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Leave Type</label>
            <p className="mt-1 text-lg text-gray-900">{request.leaveTypeName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className="mt-1">
              <StatusBadge status={request.status} />
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Start Date</label>
            <p className="mt-1 text-lg text-gray-900">{request.startDate}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">End Date</label>
            <p className="mt-1 text-lg text-gray-900">{request.endDate}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Days</label>
            <p className="mt-1 text-lg text-gray-900 font-semibold">{request.totalDays}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Submitted Date</label>
            <p className="mt-1 text-lg text-gray-900">{new Date(request.submittedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {request.reason && (
          <div className="mt-6 pt-6 border-t">
            <label className="text-sm font-medium text-gray-500">Reason</label>
            <p className="mt-2 text-gray-900">{request.reason}</p>
          </div>
        )}

        {request.managerComment && (
          <div className="mt-6 pt-6 border-t">
            <label className="text-sm font-medium text-gray-500">Manager Comment</label>
            <p className="mt-2 text-gray-900">{request.managerComment}</p>
          </div>
        )}

        {/* Actions */}
        {canCancel && (
          <div className="mt-6 pt-6 border-t flex gap-4">
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Cancel Request
            </button>
          </div>
        )}
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Audit Trail</h2>
        {auditTrail.length === 0 ? (
          <p className="text-gray-600">No audit history available</p>
        ) : (
          <div className="space-y-4">
            {auditTrail.map((entry) => (
              <div key={entry.id} className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="font-semibold text-gray-900">{entry.action}</p>
                <p className="text-sm text-gray-600">
                  By: {entry.actorName} ({entry.actorEmail})
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(entry.occurredAt).toLocaleString()}
                </p>
                {entry.comment && <p className="text-sm text-gray-700 mt-1">{entry.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Leave Request?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this leave request? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Keep Request
              </button>
              <button
                onClick={() => cancelMutation.mutate()}
                disabled={cancelMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Request'}
              </button>
            </div>
          </div>
        </div>
      )}
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
