# Engineering Principles

**One standard across every repo. Version 5.1.**

> **Code should make its intent obvious to the next person who reads it — including you in six months, and including an AI agent with no memory of why any of this exists.**

Good engineering is not the production of code. It is the production of a system that can be **understood, changed, verified, recovered and trusted**.

---

# 0. How to use this standard

Keep this file at the repository root as `codingprinciples.md` and reference it from whichever agent instruction files exist, such as `CLAUDE.md`, `AGENTS.md`, or `.github/copilot-instructions.md`.

Agents **MUST read this document before making changes**.

Every maintained repository declares near the top of its README:

```text
Engineering principles: v5.1
Assurance tier: 1 | 2 | 3
Canonical repository: https://github.com/owner/repository
```

Repository-specific architectural or stack conventions belong in the repository, not in the universal principles. Use a file such as `REPO_CONVENTIONS.md` and `docs/decisions/` for durable project-specific decisions.

Do not silently modify this standard in one repository. Change the shared standard deliberately and increment its version.

## 0.1 Normative language

This document uses three levels deliberately.

**MUST** — A hard requirement whenever the rule applies to the repository's assurance tier. An agent must not silently weaken, reinterpret or ignore a MUST.

**SHOULD** — The required default. Depart from a SHOULD only for a concrete reason. When a change departs from a SHOULD, state the reason in the change summary, commit, pull request or decision record — whichever is the normal durable record for that repository. A SHOULD that is silently ignored has been treated as a MAY and is therefore a violation of this standard.

**MAY** — Optional. Use when it materially improves the system.

Words such as "probably", "ideally", "where appropriate" and "generally" do not create additional requirement levels.

## 0.2 When principles conflict

Use this order:

```text
safety & data integrity
    ↓
correctness
    ↓
recoverability
    ↓
clarity
    ↓
simplicity
    ↓
consistency
    ↓
performance
    ↓
convenience
```

A smaller diff is not better if it is wrong. A simpler implementation is not better if it loses data. A consistent implementation is not better if the convention itself is unsafe. A passing test suite is not enough if the observed behaviour is wrong.

## 0.3 Assurance-tier applicability

Normative language and assurance tiers compose as follows.

A **MUST only becomes mandatory when the section containing it is required for that repository's assurance tier**, except for the universal safety floor and overlays below.

| Requirement set | Applies to |
|---|---|
| Universal safety floor | Every repository |
| Tier 1 requirements | Tier 1, Tier 2 and Tier 3 |
| Tier 2 requirements | Tier 2 and Tier 3 |
| Tier 3 requirements | Tier 3 |
| LLM/agent overlay | Any tier using an LLM or autonomous coding/runtime agent |

### Universal safety floor

The following apply regardless of tier:

- §1 — understand before changing
- §2.1 — small, complete changes
- §2.3 — no speculative abstraction
- §2.4 — do not silently mix refactoring and behaviour change
- §3.4 — precise naming
- §3.6–3.7 — consistency and truthful comments
- §5.1–5.2 — failures cannot masquerade as success
- §6.1 — secrets and authorisation boundaries remain protected
- §6.3 — dependencies must justify themselves
- §7.1 — the interface must not invent certainty
- §8.4 — evidence must be reported accurately whenever checks are claimed
- §9.4 — whenever a coding agent is used, it reports evidence rather than confidence
- §10 — a maintained repository states what it is and how to run it

No assurance tier permits committing secrets, knowingly fabricating system state, claiming verification that did not occur, or silently treating a failed operation as successful.

### Tier 1 requirements

Tier 1 consists of the universal safety floor. It is valid only while the repository remains genuinely experimental. If the repository begins storing persistent data somebody would care about losing, becomes regularly used, or becomes a dependency of another maintained system, it **MUST be promoted to Tier 2**.

### Tier 2 requirements

Tier 2 requires the universal safety floor plus §2.2 and §2.5; §3.1–3.3 and §3.5; all of §4; §5.3–5.4; §6.4; §7.2; §8.1–8.3 and §8.5; and the full documentation requirements of §10.

If the repository begins handling money, health data, workplace/client information, authentication/authorisation, other people's private data, or another similarly high-consequence domain, it **MUST be promoted to Tier 3**.

### Tier 3 requirements

Tier 3 requires the **entire standard**. Nothing in the tier system permits a Tier 3 repository to opt out of a relevant MUST merely because implementing it is inconvenient.

### LLM and agent overlay

If a repository contains an LLM-driven feature, §9.1–9.3 apply regardless of assurance tier. If a coding agent is modifying any repository, §9.4 applies to that work regardless of assurance tier. The tier controls the depth of verification around the model; it does not make model output trustworthy.

## 0.4 One project has one canonical repository

Every actively maintained project **MUST have exactly one canonical repository**.

The canonical repository owns authoritative default-branch history, active feature branches and pull requests, current issues, releases/version tags and authoritative deployment configuration.

Copies elsewhere **MUST** have an explicit role: read-only mirror, archived predecessor, backup, deliberate upstream/downstream fork, or generated distribution copy.

A mirror **MUST NOT** receive independent feature development. If changes are being developed independently in two repositories that both claim to represent the same project, canonical ownership has been lost and work **MUST stop until one is selected**.

A deliberate fork may become its own canonical repository only when intentionally treated as a different project.

Every maintained deployment **MUST** be traceable:

```text
canonical repository → branch/tag/commit → build → deployment
```

Multiple deployments are allowed. Multiple unexplained sources of truth are not. If old repositories or deployments no longer have a deliberate role, archive or remove them rather than leaving them looking authoritative.

## 0.5 When an agent cannot comply

An agent **MUST NOT guess its way around a MUST**.

This includes when required context cannot be obtained; authoritative instructions conflict; the task requires violating a MUST; a safe recovery path cannot be established; an irreversible action cannot be verified; required access/tooling is unavailable; the canonical repository cannot be determined; or plausible interpretations materially differ in consequence.

When blocked:

1. **Stop the affected action.**
2. **Do not perform the destructive, irreversible or assumption-dependent step.**
3. **State the exact conflict or missing fact.**
4. **Name the principle that prevents proceeding.**
5. **Preserve work already completed safely.**
6. **Continue only with independent, reversible work that does not rely on the unresolved decision.**
7. **Request an explicit decision when a human is available.**

Do not convert "I don't know" into "this is probably what they meant." Do not weaken a MUST because completing the task would otherwise be inconvenient. Do not present partial compliance as full completion.

If §1 requires understanding that cannot be reached from the available repository, documentation, history or tools, the agent **MUST stop changing the affected area rather than infer architecture from filenames or patterns alone**. It may investigate further, report what it established and propose the next safe step. It may not manufacture understanding and then produce a confident diff.

---

# The ten rules

1. **Understand the system before changing it.**
2. **Never optimise for producing a diff.**
3. **Make the smallest change that completely solves the problem.**
4. **Every important fact has one canonical owner of truth.**
5. **Validate everything crossing a trust boundary.**
6. **Important state changes remain correct under retries, failures and concurrency.**
7. **Fail loudly inside the system and honestly to the user.**
8. **The interface never claims something the system does not know.**
9. **Anything capable of destroying, exposing or materially misrepresenting important data is tested according to its risk.**
10. **"Done" means demonstrated with named evidence.**

---

# 1. Understand before changing

## 1.1 Understand the existing behaviour

Before changing code, you **MUST** understand enough of the surrounding path to explain what the existing code does, why it exists, who calls it, what it depends on, what depends on it, where inputs originate, where outputs go, what persistent state it touches and which assumptions must remain true.

The depth of investigation follows the consequence of getting it wrong.

**Smell:** you cannot explain in one sentence what the code you are about to remove was doing.

## 1.2 Never optimise for producing a diff

The goal is to improve the system, not maximise changed files. A five-line fix based on understanding is better than a 300-file automated rewrite based on pattern matching.

Volume of change is not evidence of progress. Agent activity is not evidence of progress. A tidy diff is not evidence of correctness.

## 1.3 Prove equivalence before bulk automation

Repository-wide replacements, codemods, mass renames and automated migrations **MUST NOT** be used merely because many lines look similar. Before applying a bulk transformation, establish why affected cases are semantically equivalent. Afterwards, verify transformed behaviour. Compilation alone does not establish semantic equivalence.

---

# 2. Change deliberately

## 2.1 Small, complete and reversible

A change **SHOULD** contain one coherent concern. Make the smallest change that **completely** solves the problem — not the smallest change that makes the visible symptom disappear.

Do not bundle unrelated cleanup into a fix. Cleanup **MAY** be included when required to make the fix safe or to remove code the change made obsolete.

Commit messages **SHOULD** explain why the change exists, not narrate the diff.

## 2.2 Know the recovery path before destructive work

Before deleting important data, changing persistent schemas, mass-renaming data/files, running destructive migrations, replacing storage formats or performing irreversible bulk operations, you **MUST** know how the system will recover if the operation fails.

For persistent important data, create or confirm the required backup or recovery point **before** the destructive step. A backup is not considered proven merely because the file exists.

## 2.3 Prefer subtraction to speculative abstraction

Remove dead code, duplicated concepts, obsolete paths, unused architecture and dependencies no longer providing value. Do not add infrastructure solely because it might be useful one day.

The target is not minimum line count. The target is minimum **conceptual load consistent with correctness**. Git remembers deleted code.

**Smell:** a substantial abstraction exists and no working path depends on it.

## 2.4 Separate refactoring from behavioural change

Decide explicitly whether behaviour remains unchanged, deliberately changes or becomes unsupported. Do not hide behaviour changes inside a refactor. When externally observable behaviour changes, the code, tests and relevant documentation **MUST** make that discoverable.

## 2.5 Record non-obvious decisions

When an architectural or behavioural choice cannot be understood from code alone, record the reason using the smallest suitable form: code comment for a local constraint, repo documentation for repo-wide conventions, or an architecture decision record for significant choices.

A decision record **SHOULD** state what was decided, why, significant alternatives rejected and constraints future changes must preserve.

Comments explain **why**. The code should explain **what**.

---

# 3. Make the structure obvious

## 3.1 One fact, one canonical authority

Every important fact **MUST** have one canonical authority: user identity, account balance, save state, current HP, inventory, backup format, permission state, calculated plan spend, and so on.

Caches, indexes, projections, materialised views and other derived representations **MAY** exist. When they do, the system **MUST** make clear which representation owns truth, which are derived, and how derived representations are rebuilt or reconciled.

**Smell:** two independently writable places can answer the same factual question differently.

## 3.2 Group by responsibility

Code **SHOULD** be organised around responsibilities/features rather than generic buckets. Prefer structures that answer "where would I look to understand this behaviour?" without repository archaeology. Do not let important feature logic scatter across unrelated `utils`, `helpers`, `common` and `misc` modules.

## 3.3 Dependencies point deliberately

Dependencies **SHOULD** flow from higher-level policy towards lower-level implementation through clear boundaries, for example:

```text
UI → application/features → domain/services → persistence/infrastructure
```

Domain or persistence layers **MUST NOT** depend on presentation code merely for convenience. Architectural dependency cycles **SHOULD** be removed rather than documented into legitimacy. When framework constraints create an apparent inversion, use interfaces, ports, callbacks or dependency injection to keep ownership clear.

## 3.4 Boring, precise names

Names **MUST** communicate intent. Prefer `exportUserData()`, `restoreUserData()`, `calculatePlanSpend()`, `recentActivities` over `doStuff()`, `handleData()`, `process2()`, `manager`, `helper`.

Generic names are acceptable only when the abstraction itself is genuinely generic and its responsibility remains obvious.

## 3.5 One level of abstraction at a time

Functions/modules **SHOULD** perform one coherent job at one conceptual level. Split work when doing so materially improves reasoning, testing, failure handling, reuse or ownership. Do not create microscopic wrappers merely to satisfy this rule.

## 3.6 Consistency beats local cleverness

Follow established repository conventions unless changing the convention is itself the deliberate task. Be consistent about naming, imports, error handling, validation, time/date handling, persistence, asynchronous behaviour, state management, tests and logs.

When replacing a convention, change the system deliberately rather than introducing a second competing convention.

## 3.7 Comments preserve intent

Do not write comments that merely repeat the code. Comments explain why.

```ts
// Bad
// Sort notes by date
notes.sort(compareNotes)

// Useful
// Copy first: the source is shared with the live-query cache,
// so mutating it would alter the cached result.
const sorted = [...notes].sort(compareNotes)
```

If the operation itself is difficult to understand, first improve the name or structure.

---

# 4. Make data flow traceable

## 4.1 Important values have a traceable path

Important data shown or acted upon **MUST** have a path that can be followed back to its authority. A typical path may be:

```text
storage/external API → repository/adapter → domain/application logic → view model/hook → UI
```

The exact architecture may differ. The requirement does not: a maintainer must be able to discover where a value came from without guessing.

## 4.2 Presentation presents; domain logic decides

Presentation code **MUST NOT** become the only home of important business/domain rules such as financial calculations, permissions, migrations, backup restoration, health transformations, combat resolution, scoring or resource consumption. Display formatting and interaction-specific logic **MAY** remain in presentation code.

## 4.3 Every trust boundary is untrusted

External data **MUST** be validated before trusted business logic relies on it. Trust boundaries include user input, APIs, URL parameters, environment/config values, imported files, browser/device storage, older persisted schemas, webhooks, inter-process messages and model output.

Validation **SHOULD** happen as close to the boundary as practical using the mechanism idiomatic to the repo's stack. Once validated, internal code may rely on the stronger contract.

## 4.4 Do not mutate data you do not exclusively own

Data from callers, caches, query systems, framework state, persistence libraries and shared stores **MUST** be treated as shared unless ownership is explicit. Mutation is permitted when ownership is local, exclusive and obvious. When ownership is uncertain, copy before transforming.

## 4.5 Important state transitions withstand repetition and partial failure

For state changes where duplication matters, design for "what happens if this executes twice?" and "what happens if it fails halfway through?"

Retries, double-clicks, duplicate events and network reconnects **MUST NOT** accidentally charge twice, consume resources twice, award XP twice, create duplicate durable records or advance state twice.

Use transactions, idempotency keys, uniqueness constraints, compare-and-swap, optimistic concurrency or another suitable mechanism.

## 4.6 Time, randomness and concurrency are explicit dependencies

When correctness depends on current time, timers, randomness, asynchronous ordering or concurrent writes, the relevant dependency **SHOULD** be isolated or injectable so behaviour can be reproduced and tested. Do not let accidental timing become a hidden business rule.

## 4.7 Persistent data evolves deliberately

Changes to persistent structure **MUST** have an explicit upgrade strategy. For important persisted data, identify schema/version changes, test representative previous data, ensure failed upgrades do not silently destroy originals, and define recovery or forward repair. Never assume every installation begins with today's schema.

---

# 5. Design for failure and recovery

## 5.1 Fail near the source

Invalid states and failed operations **MUST NOT** be silently converted into apparent success. Do not swallow meaningful failures.

Errors **SHOULD** preserve enough safe context to identify what failed, where, and which operation/request/build was involved.

## 5.2 Fail honestly and calmly to users

The interface **MUST** distinguish materially different states such as loading, empty, failed, unavailable, stale and successful. A failed fetch must not masquerade as an empty dataset. Success must not be displayed before the operation that defines success has completed.

## 5.3 Bound work that can grow unpredictably

Any operation whose work can grow based on external input, generated behaviour or repeated failure **MUST** have a sensible bound. Examples: retries, model/tool calls, uploads, responses, untrusted collections, recursion over external structures, queues, network waits and context history.

Fixed, inherently bounded work does not need artificial limits merely to satisfy this rule.

## 5.4 Recovery must be demonstrated

For important persistent data, define what is backed up or otherwise recoverable, where recovery material lives, what failure it protects against and how restoration works. Recovery procedures **MUST** be tested at the assurance level required by the repository.

> **A backup that has never successfully restored representative data is an unverified backup.**

---

# 6. Security, privacy and dependencies

## 6.1 Default to least privilege

Code, users, services and agents receive only the authority they require. Secrets **MUST NOT** be committed to repositories or shipped in client bundles. Authorisation **MUST** be enforced at a trusted boundary. Hiding a button is not authorisation.

## 6.2 Observability must not become data leakage

Logs **MUST NOT** contain passwords, API keys, access/refresh tokens, authentication secrets or complete sensitive payloads.

Sensitive personal data **SHOULD NOT** be logged unless a documented requirement makes it necessary and storage/access controls are appropriate. Diagnostic identifiers **SHOULD** be minimised, scoped and pseudonymised where practical. Prefer safe metadata such as request/operation IDs, error categories, build versions and bounded technical context.

## 6.3 Every dependency must earn its place

Before adding a dependency, consider security surface, maintenance burden, update cadence, runtime/bundle cost, licensing, ecosystem health and complexity added for future maintainers.

Use established dependencies for difficult, well-solved problems. Do not add a dependency to avoid writing a trivial, obvious implementation. Unused dependencies **MUST** be removed.

## 6.4 Build inputs must be controlled

Commit ecosystem lockfiles when supported. Pin or constrain runtimes and important build tooling sufficiently to make builds repeatable. CI and deployed builds **SHOULD** use environments compatible with development/testing.

> A build that succeeds only because of undocumented state on one machine is not reproducible.

---

# 7. Tell the truth to the user

## 7.1 Never present invented certainty

The interface **MUST NOT** imply information is live, measured, saved, verified or authoritative when it is not.

This includes sample data presented as real; success before persistence succeeds; fake progress indicators; stale values shown as current without disclosure; failed requests presented as empty; placeholder calculations presented as final; charts without authoritative inputs; and AI-generated assertions displayed as verified facts.

Demo data is allowed. Demo data pretending to be real is not.

## 7.2 Accessibility and supported environments are correctness

User-facing software **MUST** work in the environments the repository claims to support. Where relevant, verify keyboard operation, assistive-technology semantics, readable contrast, focus behaviour, reduced motion, touch targets, responsive layouts and real loading/error states. Repository requirements define supported devices, browsers and input methods.

---

# 8. Verify according to risk

## 8.1 Prefer behavioural invariants

Tests **SHOULD** establish behaviour and important invariants rather than mirror implementation. Write important invariants plainly first, for example:

> Anything exported must survive export → wipe → restore without losing meaning.

Then test that statement. Do not couple tests to implementation detail unless that detail is itself a deliberate contract.

## 8.2 Test according to consequence

Testing effort follows risk rather than line count. Highest priority goes to code capable of destroying data, exposing private data, moving money, changing permissions, corrupting persistent state, materially misrepresenting information or triggering irreversible external actions. Important domain rules and core user flows follow.

## 8.3 Protect contracts between independently changing parts

Interfaces between independently evolving components **SHOULD** have executable contract verification: client ↔ API, app ↔ database, service ↔ provider, importer ↔ backup format, old schema ↔ migration, rules engine ↔ AI layer. Breaking a public or persisted contract requires deliberate compatibility handling.

## 8.4 Automated gates are evidence, not proof of runtime behaviour

For the repository's required assurance level, CI **MUST** run the automated gates declared by that repository. These commonly include format/lint, type/static analysis, tests, build and dependency/security checks.

Report each result accurately. Do not say "tests passed" when only the build ran. Do not say "the application works" merely because CI is green.

**Green CI is necessary evidence where CI is required. It is not sufficient evidence of runtime behaviour.**

## 8.5 Measure performance before trading clarity for speed

Do not complicate code for speculative performance gains. Performance work **SHOULD** begin with a measurement demonstrating the problem. Performance-sensitive changes **SHOULD** record a reproducible before/after measurement. Correctness must not be traded away for speed.

---

# 9. LLM and agent systems

## 9.1 Deterministic code owns authoritative state

When deterministic code and a model work together:

> **Code owns facts. The model proposes interpretation, language and possibilities.**

Authoritative state such as money, HP, resources, inventory, XP, dice outcomes, permissions, scores and save state **MUST** be owned by deterministic application logic unless the product explicitly defines a different authority model. A language model must not silently invent mechanical truth.

## 9.2 Model output is untrusted input

Model output **MUST** be validated before affecting authoritative state. Structured output must satisfy its schema. A failed validation may trigger a bounded repair/retry strategy; repaired output **MUST** be validated again. If valid output cannot be obtained within the bound, fail without silently inventing state.

## 9.3 Assume prompt injection is possible

Content from users, files, websites, tools, retrieval systems and other models may contain adversarial instructions. Trusted instructions, application state and untrusted content **MUST** remain distinguishable. Untrusted content cannot grant itself authority.

Agent tools **SHOULD** expose the minimum capability necessary. High-consequence actions require stronger verification than low-consequence reads.

## 9.4 Agents provide evidence, not confidence

Statements such as "Everything is working" are not evidence. Completion reports **SHOULD** name what actually ran and what was observed, for example:

```text
npm test
→ 84 passed, 0 failed

npm run build
→ exit 0

manual verification
→ created save, refreshed, save persisted

deployed verification
→ API returned expected status and schema
```

Agent confidence has no bearing on correctness.

---

# 10. Documentation reduces archaeology

Maintained repositories **MUST** make the following discoverable when relevant: what the project does, how to run it, how to test it, how to build it, its assurance tier, canonical repository, important architectural constraints, where persistent data lives and how it deploys.

Documentation must change when the behaviour it describes changes. Delete or fix stale documentation. A confident description of a system that no longer exists is worse than no documentation.

---

# Assurance tiers

Choose the tier according to **the consequence of failure**, not codebase size, age or how seriously the project began. The higher tier includes all lower-tier requirements unless explicitly superseded.

A repository's declared tier is a minimum assurance level, not a waiver from common sense. If a project acquires characteristics belonging to a higher tier, its tier **MUST be raised before further work relies on the lower standard**. A repository may voluntarily operate at a higher tier. It may not operate below the tier implied by its consequences.

## Tier 1 — Experimental

Examples: throwaway prototypes, experiments, proof-of-concept tools, games with no important persistence.

Required: the universal safety floor — understand before modifying; small complete changes; precise naming; no invented UI certainty; no unnecessary architecture; actual execution before claiming completion.

Automated CI, migration infrastructure and extensive tests are not required unless the experiment itself depends on them.

## Tier 2 — Durable personal or family software

Examples: software regularly used by its creator, family applications, persistent games, personal productivity tools and long-lived hobby systems.

Required: Tier 1 plus clear canonical data ownership, traceable data paths, boundary validation, deliberate schema evolution, recovery for important persisted data, tests around destructive/persistence-critical behaviour, supported-device/accessibility verification, controlled/repeatable builds and maintained documentation.

## Tier 3 — High-consequence software

Examples: health information, financial systems, workplace/client information, authentication/authorisation, other people's private data and multi-user systems where failure can materially harm someone.

Required: the **full standard**. In particular: security/privacy controls, least privilege, decision records for non-obvious architecture, validated trust boundaries, concurrency/idempotency protection, tested migration/recovery, contract tests at critical boundaries, required CI gates, safe observability, deliberate dependency management, and LLM safeguards whenever models are involved.

Tier 3 does not require ceremony for its own sake. It requires evidence that the high-consequence risks have actually been addressed.

---

# Repository-specific conventions

The universal standard does not prescribe one framework or library. Each repository **SHOULD** declare conventions for its actual stack, for example in `REPO_CONVENTIONS.md`:

```text
Validation: Zod
Tests: Vitest
Static checks: tsc --noEmit, ESLint
Build: npm run build
Persistence: Dexie / IndexedDB
Deployment: Vercel
```

A Next.js repo may use `next build`; a Vite repo may use `vite build`; Python may use Ruff, Pyright/Mypy, Pytest and its package build; Kotlin may use ktlint, Detekt, tests and Gradle tasks.

**The principle is universal. The tool is not.**

---

# Definition of done

Before calling meaningful work complete:

## Understanding

- [ ] I can explain the previous behaviour.
- [ ] I can explain why this change is required.
- [ ] I understand the affected data/dependency path deeply enough for this repository's risk.

## Scope

- [ ] This is the smallest complete solution.
- [ ] Unrelated changes were excluded.
- [ ] Code made obsolete by this change was removed.
- [ ] Refactoring and behavioural change were not mixed silently.

## Correctness

- [ ] The relevant code actually ran.
- [ ] I observed the behaviour that matters.
- [ ] Required static checks passed.
- [ ] Required tests passed.
- [ ] Required build passed.
- [ ] These results are reported separately and accurately.

## Data and recovery

- [ ] Trust boundaries are validated.
- [ ] Important state changes tolerate retry, duplication and partial failure.
- [ ] Migration/recovery requirements are satisfied.
- [ ] This change does not silently destroy, duplicate, expose or misrepresent important data.

## User experience

- [ ] The interface tells the truth about system state.
- [ ] Loading, failure, stale and empty states are not confused.
- [ ] The affected experience works in its declared supported environment.

## Security

- [ ] No secrets entered source, client output or logs.
- [ ] Permissions were not broadened accidentally.
- [ ] Sensitive logging remains justified and minimised.
- [ ] New dependencies are justified.

## Repository authority

- [ ] I confirmed I am changing the canonical repository, or this repository's non-canonical role explicitly permits the change.
- [ ] I am not creating a second independent source of truth for the same project.
- [ ] Any deployment affected by this change can be traced back to this repository and commit.

## Standards compliance

- [ ] I know the repository's assurance tier.
- [ ] I applied the MUST requirements for that tier and any applicable overlays.
- [ ] Any departure from a SHOULD is stated explicitly in the durable change record.
- [ ] I did not silently work around a MUST.
- [ ] If a requirement could not be satisfied, I reported the blocker rather than guessing.

## Maintainability

- [ ] No dead code or orphaned files remain.
- [ ] No abandoned implementation is left commented out.
- [ ] Non-obvious decisions are recorded.
- [ ] Documentation matches the resulting system.

## Evidence

- [ ] I can state exactly what proves this change works.

If the final question cannot be answered, the change is not done.

---

# Final rule

When uncertain, optimise for the next reader **without compromising the current user**.

Leave the system easier to understand than you found it.

A good change does not merely work today. It leaves behind enough truth that the next human or AI agent can understand **what it does, why it exists, how it was verified, how it can fail, and how to change it without guessing**.

A good agent knows not only how to make a change. It also knows when **not** to make one.

When evidence is missing, authority is unclear or a high-consequence decision cannot be made safely, refusing to guess is part of correct engineering.