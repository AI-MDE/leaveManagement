# Leave Request / Time Off Management

## Actors
- Employee  
- Manager  
- HR Admin  

## Functional Requirements
- Submit leave request (type, dates, reason)
- Validate leave balance
- Route for manager approval
- Approve/reject with comments
- Update leave balance
- Modify/cancel requests
- Notify stakeholders
- Maintain leave history

## Business Rules
- Cannot exceed balance (unless allowed)
- Advance notice required for some leave types
- No overlapping leave

## Non-Functional
- Response < 2s
- Full audit trail
