# Podcast Integration TODO

**Decision:** Add to the Epic Quest Saga web experience.  
**Status:** ✅ Independent one-click podcast bank added 16 September 2026.
**Topic bank:** tabletop RPGs, dungeon mastering, fantasy storytelling, worldbuilding, game design.

## TODO
- [x] Store 25 Spotify RPG/fantasy episodes directly inside the 3layers app.
- [x] Add a collapsed bottom **🎧 Podcasts** launcher.
- [x] One tap opens the player; **🎲 Different podcast** chooses another episode and avoids an immediate repeat.
- [x] Persist the selected episode locally.
- [x] Use Spotify embed/deep links without assuming autoplay.
- [x] Keep gameplay and continuity controls primary on mobile.
- [x] Remove the runtime dependency on JoshHub, jsDelivr, the shared launcher and the shared JSON catalogue.

## Implementation
`Epic-Quest-Saga/artifacts/continuity-app/public/podcast-player.js` contains the local 25-episode bank and player UI. The Vite app shell loads it directly as `/podcast-player.js`, so a JoshHub podcast outage cannot break 3layers.
