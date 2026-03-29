import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveTypeApi } from '@api/leave-type';
import { leaveBalanceApi } from '@api/leave-balance';
import { leaveRequestApi } from '@api/leave-request';

export const SubmitLeaveRequest: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: leaveTypes = [] } = useQuery({
    queryKey: ['activeLeaveTypes'],
    queryFn: () => leaveTypeApi.getActive(),
  });

  const { data: balances = [] } = useQuery({
    queryKey: ['leaveBalanceSummary'],
    queryFn: () => leaveBalanceApi.getSummary(),
  });

  const mutation = useMutation({
    mutationFn: (command: any) => leaveRequestApi.submit(command),
    onSuccess: () => {
      navigate('/my-leave/dashboard');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.leaveTypeId) newErrors.leaveTypeId = 'Please select a leave type.';
    if (!formData.startDate) newErrors.startDate = 'Please select a start date.';
    if (!formData.endDate) newErrors.endDate = 'Please select an end date.';
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be on or after the start date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({
      leaveTypeId: formData.leaveTypeId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason || undefined,
    });
  };

  const selectedBalance = balances.find(b => b.leaveTypeId === formData.leaveTypeId);
  const selectedLeaveType = leaveTypes.find(lt => lt.id === formData.leaveTypeId);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Submit Leave Request</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Type *
          </label>
          <select
            value={formData.leaveTypeId}
            onChange={(e) => {
              setFormData({ ...formData, leaveTypeId: e.target.value });
              setErrors({ ...errors, leaveTypeId: '' });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="">Select a leave type</option>
            {leaveTypes.map((lt) => (
              <option key={lt.id} value={lt.id}>
                {lt.name}
              </option>
            ))}
          </select>
          {errors.leaveTypeId && (
            <p className="text-red-600 text-sm mt-1">{errors.leaveTypeId}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => {
              setFormData({ ...formData, startDate: e.target.value });
              setErrors({ ...errors, startDate: '' });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          {errors.startDate && (
            <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date *
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => {
              setFormData({ ...formData, endDate: e.target.value });
              setErrors({ ...errors, endDate: '' });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          {errors.endDate && (
            <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>

        {/* Advance Notice Hint */}
        {selectedLeaveType && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Advance Notice Required:</strong> {selectedLeaveType.advanceNoticeDays} day(s)
            </p>
          </div>
        )}

        {/* Available Balance */}
        {selectedBalance && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-900">
              <strong>Available Balance:</strong> {selectedBalance.availableDays} days
            </p>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason (Optional)
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate('/my-leave/dashboard')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {mutation.isPending ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>

        {mutation.isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error submitting request. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};
