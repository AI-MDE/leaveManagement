import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { leaveBalanceApi } from '@api/leave-balance';
import { employeeApi } from '@api/employee';
import { leaveTypeApi } from '@api/leave-type';

export const SetBalance: React.FC = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [leaveTypeId, setLeaveTypeId] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [totalDays, setTotalDays] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: () => employeeApi.getAll() });
  const { data: leaveTypes = [] } = useQuery({ queryKey: ['leaveTypes'], queryFn: () => leaveTypeApi.getAll() });

  const saveMutation = useMutation({
    mutationFn: () => leaveBalanceApi.update(employeeId, leaveTypeId, Number(totalDays)),
    onSuccess: () => navigate('/hr-administration/balances'),
  });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!employeeId) errs.employee = 'Please select an employee.';
    if (!leaveTypeId) errs.leaveType = 'Please select a leave type.';
    if (!year) errs.year = 'Please specify the leave year.';
    if (!totalDays) errs.totalDays = 'Total entitlement days is required.';
    if (totalDays && Number(totalDays) < 0) errs.totalDays = 'Total entitlement days must be a non-negative number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Set Employee Balance</h1>
        <button onClick={() => navigate('/hr-administration/balances')} className="text-blue-600 hover:text-blue-800">
          ← Back
        </button>
      </div>

      {saveMutation.error && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-red-800 text-sm">
          {(saveMutation.error as any)?.response?.data?.message ?? 'Failed to save balance.'}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
          <select value={employeeId} onChange={e => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
            <option value="">Select employee...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          {errors.employee && <p className="text-red-600 text-xs mt-1">{errors.employee}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <select value={leaveTypeId} onChange={e => setLeaveTypeId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
            <option value="">Select leave type...</option>
            {leaveTypes.map(lt => <option key={lt.id} value={lt.id}>{lt.name}</option>)}
          </select>
          {errors.leaveType && <p className="text-red-600 text-xs mt-1">{errors.leaveType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input type="number" value={year} onChange={e => setYear(e.target.value)} min="2020" max="2030"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
          {errors.year && <p className="text-red-600 text-xs mt-1">{errors.year}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Entitlement Days</label>
          <input type="number" value={totalDays} onChange={e => setTotalDays(e.target.value)} min="0" step="0.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="e.g. 20" />
          {errors.totalDays && <p className="text-red-600 text-xs mt-1">{errors.totalDays}</p>}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={() => { if (validate()) saveMutation.mutate(); }}
            disabled={saveMutation.isPending}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold"
          >
            {saveMutation.isPending ? 'Saving...' : 'Save Balance'}
          </button>
          <button onClick={() => navigate('/hr-administration/balances')}
            className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
