# 📐 Buzz Attack System Schema (00-system/SCHEMA.md)
## Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools

This document defines the strict data and deliverable schemas enforced by `00-system/validator_gate.py`.

---

## 1. Master Matrix DAG Node Schema

Every deliverable or feature in `matrices/master_matrix.json` must conform to:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BuzzNode",
  "type": "object",
  "required": ["id", "title", "phase", "contract_milestone", "status", "files", "verification"],
  "properties": {
    "id": { "type": "string", "pattern": "^[A-Z0-9_-]+$" },
    "title": { "type": "string" },
    "category": { "type": "string", "enum": ["core_system", "deliverable_a", "deliverable_b", "deliverable_c", "deliverable_d", "portal_hub", "print_media", "revenue_invoice"] },
    "phase": { "type": "integer", "minimum": 1, "maximum": 14 },
    "contract_milestone": { "type": "string" },
    "status": { "type": "string", "enum": ["pending", "in_progress", "verified", "locked"] },
    "dependencies": { "type": "array", "items": { "type": "string" } },
    "files": { "type": "array", "items": { "type": "string" } },
    "verification": {
      "type": "object",
      "required": ["gate_passed", "zero_pii_checked", "print_ready_checked"],
      "properties": {
        "gate_passed": { "type": "boolean" },
        "zero_pii_checked": { "type": "boolean" },
        "print_ready_checked": { "type": "boolean" },
        "hash": { "type": "string" },
        "timestamp": { "type": "string" }
      }
    }
  }
}
```

---

## 2. Deliverable Payload Schema

Every feature data output payload submitted to the validator gate must follow:

```json
{
  "type": "object",
  "required": ["node_id", "author", "timestamp", "summary", "artifacts", "compliance"],
  "properties": {
    "node_id": { "type": "string" },
    "author": { "type": "string" },
    "timestamp": { "type": "string" },
    "summary": { "type": "string" },
    "artifacts": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["path", "file_type", "status"],
        "properties": {
          "path": { "type": "string" },
          "file_type": { "type": "string", "enum": ["html", "css", "js", "md", "json", "docx", "pdf"] },
          "status": { "type": "string" }
        }
      }
    },
    "compliance": {
      "type": "object",
      "required": ["coppa_ferpa_compliant", "zero_pii", "human_analog_ui"],
      "properties": {
        "coppa_ferpa_compliant": { "type": "boolean" },
        "zero_pii": { "type": "boolean" },
        "human_analog_ui": { "type": "boolean" }
      }
    }
  }
}
```

---

## 3. Financial Invoice Line Item Schema

```json
{
  "type": "object",
  "required": ["invoice_number", "billing_period", "milestones", "total_amount", "cumulative_billed"],
  "properties": {
    "invoice_number": { "type": "string" },
    "billing_period": { "type": "string" },
    "milestones": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["deliverable_id", "title", "contract_total", "prior_billed", "current_billed", "cumulative_total", "pct_earned"],
        "properties": {
          "deliverable_id": { "type": "string" },
          "title": { "type": "string" },
          "contract_total": { "type": "number" },
          "prior_billed": { "type": "number" },
          "current_billed": { "type": "number" },
          "cumulative_total": { "type": "number" },
          "pct_earned": { "type": "number" }
        }
      }
    },
    "total_amount": { "type": "number" },
    "cumulative_billed": { "type": "number" }
  }
}
```
