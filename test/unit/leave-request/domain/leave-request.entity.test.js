"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leave_request_entity_1 = require("../../../../src/leave-request/domain/leave-request.entity");
const baseProps = () => ({
    id: 'req-001',
    employeeId: 'emp-001',
    leaveTypeId: 'lt-001',
    startDate: '2026-05-01',
    endDate: '2026-05-05',
    totalDays: 5,
    reason: null,
    status: 'PENDING',
    submittedAt: new Date('2026-04-01T10:00:00Z'),
    reviewedAt: null,
    reviewedBy: null,
    managerComment: null,
    version: 1,
    createdAt: new Date('2026-04-01T10:00:00Z'),
    updatedAt: new Date('2026-04-01T10:00:00Z'),
});
describe('LeaveRequestEntity', () => {
    describe('create()', () => {
        it('creates a new entity with PENDING status and version 1', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.create({
                id: 'req-001',
                employeeId: 'emp-001',
                leaveTypeId: 'lt-001',
                startDate: '2026-05-01',
                endDate: '2026-05-05',
                totalDays: 5,
                reason: 'Holiday',
            });
            expect(entity.id).toBe('req-001');
            expect(entity.status).toBe('PENDING');
            expect(entity.version).toBe(1);
            expect(entity.reviewedAt).toBeNull();
            expect(entity.reviewedBy).toBeNull();
            expect(entity.managerComment).toBeNull();
            expect(entity.reason).toBe('Holiday');
        });
        it('defaults reason to null when not provided', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.create({
                id: 'req-002',
                employeeId: 'emp-001',
                leaveTypeId: 'lt-001',
                startDate: '2026-05-01',
                endDate: '2026-05-05',
                totalDays: 5,
            });
            expect(entity.reason).toBeNull();
        });
    });
    describe('rehydrate()', () => {
        it('restores entity from persisted props', () => {
            const props = baseProps();
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(props);
            expect(entity.id).toBe(props.id);
            expect(entity.status).toBe('PENDING');
            expect(entity.version).toBe(1);
        });
    });
    describe('approve()', () => {
        it('sets status to APPROVED and records reviewer', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(baseProps());
            entity.approve('mgr-001', 'Looks good');
            expect(entity.status).toBe('APPROVED');
            expect(entity.reviewedBy).toBe('mgr-001');
            expect(entity.managerComment).toBe('Looks good');
            expect(entity.reviewedAt).not.toBeNull();
        });
        it('sets managerComment to null when not provided', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(baseProps());
            entity.approve('mgr-001');
            expect(entity.managerComment).toBeNull();
        });
    });
    describe('reject()', () => {
        it('sets status to REJECTED and records reviewer', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(baseProps());
            entity.reject('mgr-001', 'Not enough cover');
            expect(entity.status).toBe('REJECTED');
            expect(entity.reviewedBy).toBe('mgr-001');
            expect(entity.managerComment).toBe('Not enough cover');
        });
    });
    describe('cancel()', () => {
        it('sets status to CANCELLED from PENDING', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(baseProps());
            entity.cancel();
            expect(entity.status).toBe('CANCELLED');
        });
        it('sets status to CANCELLED from APPROVED', () => {
            const props = { ...baseProps(), status: 'APPROVED' };
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(props);
            entity.cancel();
            expect(entity.status).toBe('CANCELLED');
        });
    });
    describe('modify()', () => {
        it('updates dates and increments version for PENDING request', () => {
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(baseProps());
            entity.modify('2026-06-01', '2026-06-03', 3, 'Updated reason');
            expect(entity.startDate).toBe('2026-06-01');
            expect(entity.endDate).toBe('2026-06-03');
            expect(entity.totalDays).toBe(3);
            expect(entity.version).toBe(2);
            expect(entity.status).toBe('PENDING');
        });
        it('resets APPROVED status to PENDING on modification', () => {
            const props = { ...baseProps(), status: 'APPROVED' };
            const entity = leave_request_entity_1.LeaveRequestEntity.rehydrate(props);
            entity.modify('2026-06-01', '2026-06-03', 3);
            expect(entity.status).toBe('PENDING');
            expect(entity.version).toBe(2);
        });
    });
});
