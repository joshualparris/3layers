# 3layers — Beautiful Code Standard Audit

**Audit date:** 17 September 2026  
**Repository tier:** Experimental / multi-artifact project  
**Standard:** The Beautiful Code Standard

## Overall finding

3layers contains an `Epic-Quest-Saga` project with multiple Replit `artifacts/*` packages and committed built `dist/` output. The biggest quality problem is not individual functions; it is **unclear ownership of source versus generated/platform artefacts**.

## Priorities

1. Document which directories are canonical source packages and which are generated Replit/build outputs.
2. Stop committing `dist/` bundles where they can be reproducibly built from source; Git should not hold two authorities for the same app.
3. Remove platform metadata that is not required to reproduce development outside Replit.
4. Add one root workspace command/CI pipeline that installs, types/lints, tests and builds the actual source packages.
5. Add real-user smoke tests for each genuinely shipped app rather than treating successful builds as runtime proof.
6. Archive redundant artefact copies instead of maintaining parallel generated projects.

## Bottom line

**Make source versus output obvious, then prove the canonical source builds and works.**
