# Employee

```json
{
  "entity": {
    "id": "ENT-001",
    "name": "Employee",
    "description": "A person who can submit leave requests. May also be a Manager for other employees.",
    "actor_ref": "ACT-001",
    "attributes": [
      { "name": "id",          "type": "uuid",    "constraints": ["PK", "NOT NULL"] },
      { "name": "name",        "type": "string",  "constraints": ["NOT NULL"] },
      { "name": "email",       "type": "string",  "constraints": ["NOT NULL", "UNIQUE"] },
      { "name": "manager_id",  "type": "uuid",    "constraints": ["FK -> Employee.id", "NULLABLE"],
        "note": "NULL for top-level employees / HR Admins" },
      { "name": "role",        "type": "enum",    "constraints": ["NOT NULL"],
        "values": ["EMPLOYEE", "MANAGER", "HR_ADMIN"],
        "note": "A Manager is also an Employee; role drives capability, not a separate table" },
      { "name": "created_at",  "type": "datetime","constraints": ["NOT NULL"] },
      { "name": "updated_at",  "type": "datetime","constraints": ["NOT NULL"] }
    ],
    "relationships": [
      { "type": "self",       "target": "Employee",    "cardinality": "many-to-one",  "description": "Employee has one direct Manager" },
      { "type": "has_many",   "target": "LeaveRequest","cardinality": "one-to-many",  "description": "Employee has many LeaveRequests" },
      { "type": "has_many",   "target": "LeaveBalance","cardinality": "one-to-many",  "description": "Employee has one LeaveBalance per LeaveType" }
    ],
    "source_refs": ["ACT-001", "ACT-002", "ACT-003", "FR-006", "FR-009"]
  }
}

```
