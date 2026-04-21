# Indigo Launcher

An Electron + React desktop app prototype for a unified PC game launcher.

Right now the repo contains the desktop shell, some basic routed pages, and a few standalone UI mockups for onboarding and auth. Database work, launcher imports, playtime tracking, and the bigger launcher features are not built yet.

## Prerequisites

- [Node.js](https://nodejs.org/) v24 LTS or higher
- [npm](https://www.npmjs.com/) — installed with NodeJS
- [Git](https://git-scm.com/)

## Getting Started

```shell
# Install dependencies
npm install

# Run the Electron app with the UI dev server
npm run start:dev
```

For UI-only work:

```shell
npm run start --prefix ui
```

## Current State

- Electron window with a custom title bar and window controls
- React app shell with Home, Library, and Settings routes
- Login and register pages
- Extra mockup pages in the repo for landing and onboarding

## Not Built Yet

- Database or saved game library
- Platform import
- Playtime tracking
- Quests logic
- Recommendations
- UI wired to the API (auth forms exist but don't call the backend yet)

## Branch Strategy

- `main` — Stable code only, **NEVER** push here directly.
- `dev` — Integration branch, merge your other branches here.
- `feature/[name]` — Create one of these when implementing new features.
- `chore/[name]` — for minor changes like config updates or cleanup.

Always branch off `dev`, **NEVER** off `main`.

## Commit Style

Keep commits lowercase and descriptive:

```
got the sidebar working
fix crash on settings page
```
