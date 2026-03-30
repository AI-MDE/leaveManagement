import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveTypeApi } from '@api/leave-type';
import type { LeaveType } from '../../types/LeaveType';

export const NewLeaveType: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    advanceNoticeDays: 0,
    requiresBalance: true,
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (leaveType: Omit<LeaveType, 'id' | 'createdAt' | 'updatedAt'>) =>
      leaveTypeApi.create(leaveType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaveTypes'] });
      navigate('/hr-administration/leave-types');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.code) newErrors.code = 'Leave type code is required.';
    if (!formData.name) newErrors.name = 'Leave type name is required.';
    if (formData.advanceNoticeDays === undefined)
      newErrors.advanceNoticeDays = 'Advance notice days is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">New Leave Type</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Type Code *
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => {
              setFormData({ ...formData, code: e.target.value });
              setErrors({ ...errors, code: '' });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="e.g., ANNUAL"
          />
          {errors.code && <p className="text-red-600 text-sm mt-1">{errors.code}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Type Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: '' });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="e.g., Annual Leave"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Advance Notice Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Advance Notice Days *
          </label>
          <input
            type="number"
            value={formData.advanceNoticeDays}
            onChange={(e) => {
              setFormData({ ...formData, advanceNoticeDays: parseInt(e.target.value) });
              setErrors({ ...errors, advanceNoticeDays: '' });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            min="0"
          />
          {errors.advanceNoticeDays && (
            <p className="text-red-600 text-sm mt-1">{errors.advanceNoticeDays}</p>
          )}
        </div>

        {/* Requires Balance */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.requiresBalance}
              onChange={(e) => setFormData({ ...formData, requiresBalance: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">Requires Balance Deduction</span>
          </label>
        </div>

        {/* Active */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/hr-administration/leave-types')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {mutation.isPending ? 'Creating...' : 'Create Leave Type'}
          </button>
        </div>

        {mutation.isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {(mutation.error as any)?.response?.data?.error ?? (mutation.error as any)?.message ?? 'Error creating leave type. Please try again.'}
          </div>
        )}
      </form>
    </div>
  );
};
