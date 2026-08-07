# Sprint Update Report: TTFS UTRGV Project Cool Schools

**Date:** August 7, 2026
**To:** TTFS Project Stakeholders
**Subject:** Sprint Progress on User Access, Sponsorships, Educational Adaptation, and Lesson Plan Portal

This document outlines the four major feature requests addressed in our most recent sprint. For each item, we detail the challenge presented, the specific request, our implementation approach, and the current status.

---

## 1. User Access Level Strategy

**The Challenge:**
The dashboard serves multiple types of users—researchers, university admins, school principals, teachers, and public users. We needed a secure way to restrict sensitive data (like unanonymized surveys or raw backend configurations) while providing an open experience for students and the general public, adhering to FERPA/COPPA guidelines.

**The Request:**
Design and implement a mockup/strategy for role-based access control (RBAC) across the platform.

**How We Addressed It:**
We simulated a user access level strategy by introducing distinct access portals and visual cues that adapt based on the assumed user role (e.g. "Public/Student", "Educator", "Admin"). We structured the UI to hide or show specific telemetry components, ensuring that any potential PII or secure data remains behind authorization gateways.

**Status:**
✅ **In Progress/Started** - The initial conceptual strategy and UI mockups have been established.

---

## 2. Campus Tree Sponsorship Portal

**The Challenge:**
To sustain the Cool Schools initiative long-term, there is a need for community engagement and fundraising. Donors want to see a tangible impact of their contributions, specifically through sponsoring trees on campuses.

**The Request:**
Create a dedicated portal that allows community members and alumni to sponsor specific trees, visualize their impact, and seamlessly interact with a sponsorship process.

**How We Addressed It:**
We designed a sponsorship interface integrated with the campus map. Users can see the cost of sponsoring different species, view their ecological benefits (e.g., stormwater runoff mitigated, CO2 sequestered), and enter a simulated checkout/sponsorship flow. The design is kept clean, human-analog, and emphasizes the direct environmental ROI.

**Status:**
✅ **In Progress/Started** - The prototype portal is built and integrated with the campus data visualization.

---

## 3. Biodiversity Portal Educational Adaptation for Younger Children

**The Challenge:**
The primary dashboard contains heavy data and complex charts (iTree analytics, physics-based simulations) that are difficult for elementary students to parse. The biodiversity data specifically needed an educational spin.

**The Request:**
Adapt the biodiversity tracker into a simplified, engaging format tailored for younger children, encouraging them to spot and learn about local wildlife without overwhelming them with data.

**How We Addressed It:**
We designed an "Educational Adaptation" of the biodiversity tool. It features a simplified "Habitat Spotting" interface, focusing on visual icons, simple facts, and gamified interaction. Importantly, all data collected through this portal is anonymized at the campus level, ensuring strict adherence to COPPA guidelines (no student names or precise locations).

**Status:**
✅ **In Progress/Started** - The child-friendly biodiversity interface mockup has been developed and styled.

---

## 4. Housing TEKS-Aligned Lesson Plans (Password Protected)

**The Challenge:**
The Texas Tree Foundation is providing a suite of TEKS-aligned lesson plans for teachers. However, these materials need to be gatekept so that only authorized educators can access them, preventing students from accessing answer keys or teacher-specific guides.

**The Request:**
Create a dedicated, password-protected page to showcase and distribute these lesson plans, similar to how the SOPs/Protocols are currently showcased.

**How We Addressed It:**
We built a new `teks_lesson_plans.html` portal. It features a secure login mock-up ("Secure Educator Access") that requires an access code. Once unlocked, teachers are presented with a clean grid of downloadable PDF lesson plans (e.g., *The Urban Canopy*, *Campus Biodiversity*). We also included a feedback form for teachers to submit post-lesson implementation notes. 

**Status:**
✅ **In Progress/Started** - The secure showcase page has been created and is ready for review.

---

*Note: All features are currently in prototype form and conform to the project's strict privacy and human-analog design guidelines. We will continue refining these based on stakeholder feedback.*
