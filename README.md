# Indigo Launcher

A unified PC game library desktop app built with Electron, React, and SQLite.

## Prerequisites

- [Node.js](https://nodejs.org/) v24 LTS or higher
- [npm](https://www.npmjs.com/) — installed with NodeJS
- [Git](https://git-scm.com/)

## Getting Started

```shell
# Create directory and go into the directory
mkdir ./Launcher
cd Launcher

# Initialise the git repository and add remote origin
git init
git remote add origin https://github.com/Indigo-Launcher/Launcher.git
git branch -M dev

# Install dependencies
npm install

# Run the application
npm run start:dev
```

## Branch Strategy

- `main` — Stable code only, **NEVER** push here directly.
- `dev` — Integration branch, merge your other branches here.
- `feat/[name]` — Create one of these when implementing new features.
- `chore/[name]` — Create one of these when making minor changes.

Always branch off `dev`, **NEVER** off `main`.

## Commit Style

Keep commits lowercase and descriptive:

```
got the sidebar working
fix crash on settings page
```
