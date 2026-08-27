# Governance & Compliance Log

## TTFS UTRGV Cool Schools Project

This document tracks all privacy, compliance, and governance audits to ensure strict adherence to FERPA, COPPA, and the Global Project Rules (Privacy-First Architecture).

### Audit Logs

#### [2026-06-19] Prototype B (Verified Volunteer Scanner)
*   **Location**: `/portfolio/volunteer_scanner/prototype_b_verified/`
*   **Auditor**: Privacy & Compliance Officer Agent
*   **Status**: **FAILED - HIGH RISK (PII VIOLATION)**
*   **Findings**:
    *   **FERPA/COPPA Violation**: The application directly requests, captures, and displays a "Student ID Number" (`#student-id` in `index.html` and `currentStudentId` in `app.js`). 
    *   **Rule Conflict**: Global Project Rule 1 states "Absolutely no Personally Identifiable Information (names, exact student locations, specific student photos without waivers) can be required or stored by default in any user-facing module."
    *   **Anonymization Failure**: The receipt process is tied to an individual student identifier rather than being aggregated at the campus level.
*   **Action Required**:
    *   Remove the "Student ID Number" input field and internal logic.
    *   Refactor the verification process to use a non-PII, anonymized method (e.g., a generic "Campus/Class Group Code" or anonymous hash) or drop the requirement entirely to strictly aggregate hours at the campus/homeroom level without individual tracking.

---

#### [2026-08-21] Full Codebase Compliance Audit & Remediation
*   **Auditor**: Antigravity AI Agent (Claude Opus 4.6) + Human Review
*   **Scope**: All 99 HTML files, 176+ total files, 14 campus profiles, all data structures
*   **Status**: **REMEDIATED — 3 Critical Issues Fixed**

##### Finding 1: `data/mock_students.json` — CRITICAL (FIXED)
*   **Severity**: 🔴 HIGH RISK (COPPA/FERPA VIOLATION)
*   **Finding**: File contained **3,065 individual student movement records** with fields: `student_id: "Student_1"`, exact GPS coordinates `[-98.07006, 26.16716]`, timestamps, zone descriptions, and hour-of-day tracking. Also duplicated in `TTFS_Deliverables_Submission/04_Dashboard_Prototype/data/mock_students.json`.
*   **Rule Violated**: Global Project Rule 1 — "Absolutely no Personally Identifiable Information (names, exact student locations) can be required or stored."
*   **Remediation**: Both files replaced with COPPA/FERPA-compliant aggregated zone-level GeoJSON containing only campus zone names, average students per hour, peak hours, and departmental breakdowns. Zero individual student records remain.
*   **Verification**: Project-wide search confirmed no other files referenced `mock_students.json`.

##### Finding 2: `field_survey.html` — HIGH (FIXED)
*   **Severity**: 🟡 HIGH RISK (PII Ingestion Vector)
*   **Finding**: Free-text `<input type="text" id="observerName">` field allowed students to type their real names, which would then be stored in `localStorage` as PII.
*   **Rule Violated**: Global Project Rule 1 — No PII collection.
*   **Remediation**: Replaced free-text input with anonymous team/group code `<select>` dropdown (Team Falcon, Team Ocelot, Team Monarch, Homeroom 3A–5A, UTRGV Research, TTF Staff). Updated `field_survey.js` to store `team_code` instead of `observerName`.

##### Finding 3: `school.js` Runtime Error — MEDIUM (FIXED)
*   **Severity**: 🟢 MEDIUM (Functional Defect)
*   **Finding**: `school.js` queried for DOM elements (`profileCanopy`, `saveProfile`, `schoolMap`) that do not exist in `school.html`, causing `TypeError: Cannot read properties of null`.
*   **Remediation**: All DOM queries wrapped in defensive null checks. No functional changes to existing behavior.

##### Additional Fixes (Navigation & Broken Links)
*   **21 portfolio mini-apps**: Added back-navigation bars to prevent one-way navigation traps.
*   **`portfolio/teks_curriculum/index.html`**: Created missing hub page linking to 5 TEKS curriculum sub-apps.
*   **`rivas_tree_roster.html`**: Added back-navigation to dashboard.

##### Remaining Compliance Notes
*   `survey.html` (Biometeorological Kiosk): **FULLY COMPLIANT** — Zero PII, anonymous emoji-button clicks aggregated at zone level.
*   `student_tracking.html`: **FULLY COMPLIANT** — Displays only aggregated class/department metrics, no individual student data.
*   `photo_data.js`: **FULLY COMPLIANT** — Uses anonymous Teacher IDs (e.g., "Teacher ID: 492"), no student names or faces.
*   `donors_data.js`: **LOW RISK** — Contains simulated donor data with `@example.com` emails and `555` phone numbers. Acceptable for demo purposes but should be replaced with real anonymized data before production.
