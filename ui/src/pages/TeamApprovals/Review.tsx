import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';
import { leaveBalanceApi } from '@api/leave-balance';

export const ReviewRequest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const { data: request, isLoading } = useQuery({
    queryKey: ['leaveRequest', id],
    queryFn: () => leaveRequestApi.getById(id!),
  });

  const { data: employeeBalance } = useQuery({
    queryKey: ['leaveBalance'],
    queryFn: () => leaveBalanceApi.getByLeaveType(request?.leaveTypeId!),
    enabled: !!request?.leaveTypeId,
  });

  const approveMutation = useMutation({
    mutationFn: () => leaveRequestApi.approve(id!, { managerComment: comment }),
    onSuccess: () => navigate('/team-approvals/pending'),
  });

  const rejectMutation = useMutation({
    mutationFn: () => leaveRequestApi.reject(id!, { managerComment: comment }),
    onSuccess: () => navigate('/team-approvals/pending'),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!request) {
    return <div className="text-center text-gray-600">Request not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Review Leave Request</h1>
        <button
          onClick={() => navigate('/team-approvals/pending')}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Pending
        </button>
      </div>

      {/* Request Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Employee</label>
            <p className="mt-1 text-lg text-gray-900">{request.employeeName}</p>
            <p className="text-sm text-gray-600">{request.employeeEmail}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Leave Type</label>
            <p className="mt-1 text-lg text-gray-900">{request.leaveTypeName}</p>
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
            <label className="text-sm font-medium text-gray-500">Available Balance</label>
            <p className="mt-1 text-lg text-green-600 font-semibold">
              {employeeBalance?.totalDays || 'N/A'} days
            </p>
          </div>
        </div>

        {request.reason && (
          <div className="pt-6 border-t">
            <label className="text-sm font-medium text-gray-500">Employee's Reason</label>
            <p className="mt-2 text-gray-900">{request.reason}</p>
          </div>
        )}
      </div>

      {/* Approval Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Decision</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Comment (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Add any comments for the employee..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => approveMutation.mutate()}
              disabled={approveMutation.isPending || rejectMutation.isPending}
              className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-semibold"
            >
              {approveMutation.isPending ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={() => rejectMutation.mutate()}
              disabled={approveMutation.isPending || rejectMutation.isPending}
              className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition font-semibold"
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);
