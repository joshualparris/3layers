# Risk Register

## Risk Matrix Legend

- Probability: Low / Medium / High
- Impact: Low / Medium / High / Critical

## Active Risks

| ID | Risk | Probability | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-001 | Canon contradiction becomes silently accepted as truth | High | Critical | Conflict engine + unresolved status enforcement | Product/DM |
| R-002 | localStorage corruption or accidental loss | Medium | High | Snapshot export/import and recovery workflow | Engineering |
| R-003 | DM-private information leaks into player-facing context | Medium | Critical | Dedicated filtering layer + QA leak tests | Engineering/QA |
| R-004 | Upstream source changes are not ingested promptly | High | Medium | Source ingestion cadence + traceability updates | Product Ops |
| R-005 | Ruleset ambiguity (2014 vs 2024 build) causes gameplay disputes | High | High | Explicit adjudication workflow and tracked decision log | Product/DM |
| R-006 | Over-reliance on manual updates creates stale docs | Medium | Medium | Automation backlog for ingestion and validation | Engineering |
| R-007 | Large source corpus (PDF-heavy) remains underutilized | Medium | Medium | Add PDF extraction tasks and verification pipeline | Product/Engineering |
| R-008 | Session-time UX friction slows table play | Medium | High | Session command center and fast retrieval UX | Product/UX |

## Review Cadence

- Weekly risk triage.
- Mandatory review at each milestone boundary.
- Immediate review after any P0/P1 incident.
