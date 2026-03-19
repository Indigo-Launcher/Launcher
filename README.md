# Indigo Launcher

A unified PC game library desktop app built with Electron, React, and SQLite.

## Prerequisites

- [Node.js](https://nodejs.org/) v22 LTS or higher
- [pnpm](https://pnpm.io/) — install with `npm install -g pnpm`
- [Git](https://git-scm.com/)

## Getting Started

```bash
git clone https://github.com/Indigo-Launcher/Launcher.git
cd Launcher
pnpm install
pnpm run dev:electron
```

## Branch Strategy

- `main` — stable code only, never push here directly
- `dev` — integration branch, merge your features here
- `feature/[name]` — create one of these for every piece of work

Always branch off `dev`, never off `main`.

## Commit Style

Keep commits lowercase and descriptive:

```
got the sidebar working
fix crash on settings page
```
