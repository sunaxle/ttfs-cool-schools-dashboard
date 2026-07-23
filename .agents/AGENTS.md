# Global Project Rules: TTFS UTRGV Cool Schools

> [!CAUTION]
> These rules are absolute. Every agent operating in this workspace must adhere to these constraints before proposing code, creating databases, or designing user interfaces.

## 1. Privacy-First Architecture (COPPA / FERPA)
Because this dashboard will be used by elementary school students over a 10-year lifecycle:
- **No PII:** Absolutely no Personally Identifiable Information (names, exact student locations, specific student photos without waivers) can be required or stored by default in any user-facing module.
- **Data Anonymization:** Any user-generated data (Tree Diaries, Habitat Spotting) must be anonymized or aggregated at the campus level, not the individual user level.
- **Compliance:** All feature proposals must be auditable for compliance with UTRGV, State of Texas, and Texas Trees Foundation privacy policies.

## 2. The Handoff Mandate
This project is not a permanent fixture on the current developer's GitHub. It is a product delivery.
- **Portability:** All database schemas, backend logic, and frontend code must be designed to be packaged, transferred, and hosted by the Texas Trees Foundation.
- **Vendor Lock-in:** Avoid overly complex or proprietary tech stacks that cannot be easily handed off to a client with basic IT infrastructure unless explicitly approved by the CTO agent.
- **Documentation:** Every major feature must have a corresponding entry in the `governance_and_compliance.md` tracking document explaining how it works for the future client.

## 3. UTRGV AI Compliance Rules
UTRGV has strict AI compliance rules (Effective Dec 1, 2025) that apply to all our research, reporting, and dashboard work.
- **Approved Tools Only:** You must only use approved enterprise tools (e.g., Copilot, Enterprise/Business versions of AI platforms). Personal/free tools (ChatGPT Free/Plus, Otter.ai, Fireflies.ai) are strictly prohibited for university work.
- **Data Protection:** Absolutely no sensitive data (student, medical, financial records) can be uploaded or processed through non-approved tools. This extends FERPA/HIPAA protections to AI.
- **Human Oversight:** AI must not operate independently of human judgment. All AI outputs must be reviewed, validated, and interpreted by a human before use (e.g., in reports, code, or outreach).
- **Technology Approval:** Any new AI software/tool must go through a Technology Assessment before use or purchase.

## 4. UI Design Philosophy (Human-Analog)
The visual identity of this project must feel "simple, productive, and functional." 
- **Avoid AI Slop:** Do not generate overly complex, messy, or hallucinated UI elements that feel like cheap AI-generated templates.
- **Human Analog Aesthetics:** Users prefer interfaces that look like they were handcrafted by a human.
- **Layout Preference:** Favor clean, split-screen layouts (e.g., half the screen scrollable with links/tools, and the other half static, like a persistent flyer or map view) whenever designing new directory or resource pages.
