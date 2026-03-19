const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

// We keep a single db connection open for the whole app lifetime.
// better-sqlite3 is synchronous which makes life way easier in the main process.
let db = null;

function getDb() {
  if (!db) {
    throw new Error('Database not initialised — call initDb() first');
  }
  return db;
}

// Call this once when the app starts (in main.js).
// Puts the db file in the user's AppData folder so it persists between sessions.
function initDb() {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'indigo.db');

  console.log('Opening database at:', dbPath);

  db = new Database(dbPath);

  // WAL mode is faster for reads, doesn't block writes
  db.pragma('journal_mode = WAL');

  createTables();
  return db;
}

function createTables() {
  // Using IF NOT EXISTS so this is safe to run every startup
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      path TEXT NOT NULL,
      cover_path TEXT,
      tags TEXT DEFAULT '[]',
      total_playtime INTEGER DEFAULT 0,
      last_played TEXT,
      times_launched INTEGER DEFAULT 0,
      notes TEXT,
      favorite INTEGER DEFAULT 0,
      added_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      duration INTEGER,
      FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      tag_weights TEXT DEFAULT '{}',
      recently_played TEXT DEFAULT '[]',
      total_playtime INTEGER DEFAULT 0,
      preferences TEXT DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS quests (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      xp_reward INTEGER DEFAULT 10,
      date TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      completed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      unlocked INTEGER DEFAULT 0,
      unlocked_at TEXT
    );
  `);

  // Make sure there's always one profile row to read from
  const existing = db.prepare('SELECT id FROM profile WHERE id = 1').get();
  if (!existing) {
    db.prepare('INSERT INTO profile (id) VALUES (1)').run();
  }
}

// Quick ID generator: doesn't need to be fancy, just needs to be unique enough
function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// tags is stored as a JSON string in SQLite, so we need to parse it on the way out
function parseGame(row) {
  if (!row) return null;
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    favorite: row.favorite === 1,
  };
}

//  Games CRUD

function getAllGames() {
  try {
    const rows = getDb().prepare('SELECT * FROM games ORDER BY name ASC').all();
    return rows.map(parseGame);
  } catch (err) {
    console.error('getAllGames failed:', err);
    return [];
  }
}

function getGameById(id) {
  try {
    const row = getDb().prepare('SELECT * FROM games WHERE id = ?').get(id);
    return parseGame(row);
  } catch (err) {
    console.error('getGameById failed:', err);
    return null;
  }
}

function addGame(game) {
  try {
    const id = game.id || makeId();
    const tags = JSON.stringify(game.tags || []);

    getDb()
      .prepare(
        `INSERT INTO games (id, name, path, cover_path, tags, notes, favorite)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        id,
        game.name,
        game.path,
        game.cover_path || null,
        tags,
        game.notes || null,
        game.favorite ? 1 : 0
      );

    // Return the full row so the caller has the defaults (added_at etc.)
    return getGameById(id);
  } catch (err) {
    console.error('addGame failed:', err);
    return null;
  }
}

// Only updates fields that are actually passed in.
// TODO: might want to validate that `id` exists before trying the update
function updateGame(id, updates) {
  try {
    const allowed = [
      'name',
      'path',
      'cover_path',
      'tags',
      'total_playtime',
      'last_played',
      'times_launched',
      'notes',
      'favorite',
    ];

    const fields = Object.keys(updates).filter((k) => allowed.includes(k));
    if (fields.length === 0) return getGameById(id);

    // Build the SET clause dynamically based on what was passed
    const setClauses = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => {
      if (f === 'tags') return JSON.stringify(updates[f]);
      if (f === 'favorite') return updates[f] ? 1 : 0;
      return updates[f];
    });

    values.push(id);

    getDb()
      .prepare(`UPDATE games SET ${setClauses} WHERE id = ?`)
      .run(...values);

    return getGameById(id);
  } catch (err) {
    console.error('updateGame failed:', err);
    return null;
  }
}

function deleteGame(id) {
  try {
    const result = getDb().prepare('DELETE FROM games WHERE id = ?').run(id);
    return result.changes > 0;
  } catch (err) {
    console.error('deleteGame failed:', err);
    return false;
  }
}

module.exports = {
  initDb,
  getDb,
  getAllGames,
  getGameById,
  addGame,
  updateGame,
  deleteGame,
};
