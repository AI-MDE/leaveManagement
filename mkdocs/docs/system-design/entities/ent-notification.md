# Notification

```json
{
  "entity": {
    "id": "ENT-006",
    "name": "Notification",
    "description": "An email notification record tracking what was sent, to whom, and for which event. Provides delivery traceability.",
    "attributes": [
      { "name": "id",               "type": "uuid",    "constraints": ["PK", "NOT NULL"] },
      { "name": "leave_request_id", "type": "uuid",    "constraints": ["FK -> LeaveRequest.id", "NOT NULL"] },
      { "name": "recipient_id",     "type": "uuid",    "constraints": ["FK -> Employee.id", "NOT NULL"] },
      { "name": "event",            "type": "enum",    "constraints": ["NOT NULL"],
        "values": ["SUBMITTED", "APPROVED", "REJECTED", "CANCELLED", "MODIFIED_PENDING", "MODIFIED_APPROVED"] },
      { "name": "channel",          "type": "enum",    "constraints": ["NOT NULL"],
        "values": ["EMAIL"],
        "note": "Email only per Q-005" },
      { "name": "sent_at",          "type": "datetime","constraints": ["NULLABLE"],
        "note": "NULL if not yet dispatched" },
      { "name": "status",           "type": "enum",    "constraints": ["NOT NULL"],
        "values": ["PENDING", "SENT", "FAILED"] },
      { "name": "created_at",       "type": "datetime","constraints": ["NOT NULL"] }
    ],
    "relationships": [
      { "type": "belongs_to", "target": "LeaveRequest", "cardinality": "many-to-one" },
      { "type": "belongs_to", "target": "Employee",     "cardinality": "many-to-one", "description": "Recipient" }
    ],
    "source_refs": ["FR-013", "FR-013a", "FR-013b", "FR-013c", "FR-013d", "FR-013e"]
  }
}

```
