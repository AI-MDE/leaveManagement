# Logical Data Model

## System


## Entities
### Employee
- Description: A person who can submit leave requests. A Manager is also an Employee — role drives capability, not a separate table.
- Owner: 
- Attributes: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
### LeaveType
- Description: A category of leave with its own rules (advance notice, balance requirement). Managed by HR Admin.
- Owner: 
- Attributes: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
### LeaveBalance
- Description: The entitlement and usage record for a specific employee, leave type, and calendar year. Updated on approval; restored on cancellation.
- Owner: 
- Attributes: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
### LeaveRequest
- Description: A formal request by an employee for a period of leave. The primary aggregate — owns the leave lifecycle state machine.
- Owner: 
- Attributes: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
### LeaveAuditEntry
- Description: Immutable audit record for every state change on a LeaveRequest. Satisfies the full audit trail requirement.
- Owner: 
- Attributes: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
### Notification
- Description: A record of an email notification sent (or to be sent) to a stakeholder in response to a leave lifecycle event.
- Owner: 
- Attributes: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]

## Relationships
