# Indigo Launcher

Indigo Launcher is an Electron + React desktop app for pulling PC games into one place. The project is built for Windows, but most UI work can still be tested on macOS through the dev app.

The active app lives in the root `electron/` and `ui/` folders. The older `apps/` folders are leftovers from an earlier layout.

## Prerequisites

- [Node.js](https://nodejs.org/) v24 LTS or higher
- [npm](https://www.npmjs.com/), installed with Node
- [Git](https://git-scm.com/)
- The Indigo API repo running on port `3001` for login, games, quests, and IGDB search

## Getting Started

```shell
npm install
npm run start:dev
```

For UI-only work:

```shell
npm run start --prefix ui
```

Run Electron from a normal terminal. The VS Code assistant shell can set `ELECTRON_RUN_AS_NODE=1`, which makes Electron start in the wrong mode.

## Current State

- Electron shell with a custom title bar and working window controls
- Login, signup, protected routes, and onboarding wired to the API
- Home page with API games, recent games, library search, sorting, filters, manual Add Game, scan import, and Play buttons
- Steam and Epic scanning through Electron IPC
- Steam scan imports can use Steam CDN cover art when an app id is available
- Discover page with simple library-based recommendations and fallback picks
- Quests page backed by the API, including starter daily quests for fresh accounts
- Friends page with local demo data
- Points Shop with local demo buying and equipping
- Settings modal with local profile edits, theme controls, connection toggles, and honest disabled states for unfinished actions

## Still Not Finished

- Playtime tracking is being left until the end and may stay as the planned-but-not-completed feature
- Friends are still mock data, not a backend feature
- Points Shop is still local demo data
- Discover is a simple recommendation screen, not a real scoring engine
- IGDB search needs real Twitch/IGDB credentials in the API `.env`
- Windows `.exe` launching needs final testing on Windows
- `npm run lint --prefix ui` still fails on older React lint issues

## Useful Commands

```shell
# Build the React app
npm run build --prefix ui

# Run focused Electron/UI helper tests
node --test electron/src/launchTarget.test.js ui/src/features/discover/discoverData.test.js ui/src/app/providers/gamePayload.test.js ui/src/app/providers/libraryUtils.test.js
```

## Branch Strategy

- `main` — stable code only, never push here directly
- `dev` — integration branch
- `feature/[name]` — for bigger feature work branched off `dev`
- `chore/[name]` — for small config or cleanup work

Small fixes can go straight onto `dev` if the team agrees.

## Commit Style

Keep commits short and plain:

```text
wire Play button to launch games
hide duplicate library games
```
