import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveRequestApi } from '@api/leave-request';

export const ModifyLeaveRequest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: request, isLoading } = useQuery({
    queryKey: ['leaveRequest', id],
    queryFn: () => leaveRequestApi.getById(id!),
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (request) {
      setStartDate(request.startDate);
      setEndDate(request.endDate);
      setReason(request.reason ?? '');
    }
  }, [request]);

  const modifyMutation = useMutation({
    mutationFn: () => leaveRequestApi.modify(id!, { startDate, endDate, reason: reason || undefined }),
    onSuccess: () => navigate(`/my-leave/requests/${id}`),
  });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!startDate) errs.startDate = 'Please select a start date.';
    if (!endDate) errs.endDate = 'Please select an end date.';
    if (startDate && endDate && endDate < startDate) errs.endDate = 'End date must be on or after the start date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const totalDays = startDate && endDate
    ? Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1
    : 0;

  if (isLoading) return <LoadingSpinner />;
  if (!request) return <div className="text-center text-gray-600 py-12">Request not found.</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Modify Leave Request</h1>
        <button onClick={() => navigate(`/my-leave/requests/${id}`)} className="text-blue-600 hover:text-blue-800">
          ← Back
        </button>
      </div>

      {request.status === 'APPROVED' && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-yellow-800 text-sm font-medium">
          This request is currently APPROVED. Modifying it will reset it to PENDING and require manager re-approval.
        </div>
      )}

      {modifyMutation.error && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-red-800 text-sm">
          {(modifyMutation.error as any)?.response?.data?.message ?? 'Failed to modify request.'}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <p className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">{request.leaveTypeName ?? request.leaveTypeId}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
            {errors.startDate && <p className="text-red-600 text-xs mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
            {errors.endDate && <p className="text-red-600 text-xs mt-1">{errors.endDate}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Days (calculated)</label>
          <p className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-semibold">{totalDays > 0 ? totalDays : '—'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason (optional)</label>
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Optional reason..." />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={() => { if (validate()) modifyMutation.mutate(); }}
            disabled={modifyMutation.isPending}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold"
          >
            {modifyMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={() => navigate(`/my-leave/requests/${id}`)}
            className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
            Cancel
          </button>
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
