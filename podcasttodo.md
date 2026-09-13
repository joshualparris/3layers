# Podcast Integration TODO

**Decision:** Add to the Epic Quest Saga web experience.  
**Status:** ✅ Core one-click podcast bank added 13 September 2026.
**Topic bank:** tabletop RPGs, dungeon mastering, fantasy storytelling, worldbuilding, game design.

## TODO
- [x] Curate 25 Spotify episodes for RPG/fantasy learning in the shared JoshHub `dnd` bank.
- [x] Add a collapsed bottom dock: **🎧 Listen to a different RPG podcast**.
- [x] One tap selects/loads another episode; persist recent selections and avoid immediate repeats.
- [x] Use Spotify embed/deep links without assuming autoplay.
- [x] Collapse automatically when normal HTML audio/video begins; live game narration remains primary.
- [x] Tag episodes by DM advice, story craft, worldbuilding, rules and game design.
- [x] Keep gameplay/launch controls primary.
- [x] Shared dock supplies mobile/a11y, reduced-motion and persistence behaviour; app-specific automated tests can be added later.

## Implementation
The Epic Quest Saga continuity app shell loads the shared `dnd` podcast catalogue through `podcast-dock-universal.js`.
