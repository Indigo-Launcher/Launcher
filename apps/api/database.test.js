// Quick smoke test for the database functions.
// Run with: node apps/electron/src/database.test.js
// Uses a temp db so it doesn't mess with any real data. Delete this file once
// I'm glad everything works and IPC is wired up.

const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

// We can't use initDb() directly here because it calls app.getPath() which
// only works inside Electron. So we wire up the same logic manually with a
// temp file instead.
const tmpDbPath = path.join(os.tmpdir(), `indigo-test-${Date.now()}.db`);
console.log('Test db at:', tmpDbPath);

const db = new Database(tmpDbPath);
db.pragma('journal_mode = WAL');

// Copy of the schema — keeping it in sync manually for now
// TODO: maybe extract schema into its own .sql file at some point
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
`);

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function parseGame(row) {
  if (!row) return null;
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    favorite: row.favorite === 1,
  };
}

// runs the tests

console.log('\n--- Adding games ---');

const game1 = {
  id: makeId(),
  name: 'The Witcher 3',
  path: 'C:/Games/Witcher3/witcher3.exe',
  tags: ['rpg', 'open-world'],
  favorite: true,
};

const game2 = {
  id: makeId(),
  name: 'Hades',
  path: 'C:/Games/Hades/Hades.exe',
  tags: ['roguelike', 'indie'],
};

db.prepare(
  `INSERT INTO games (id, name, path, cover_path, tags, notes, favorite)
   VALUES (?, ?, ?, ?, ?, ?, ?)`
).run(game1.id, game1.name, game1.path, null, JSON.stringify(game1.tags), null, 1);

db.prepare(
  `INSERT INTO games (id, name, path, cover_path, tags, notes, favorite)
   VALUES (?, ?, ?, ?, ?, ?, ?)`
).run(game2.id, game2.name, game2.path, null, JSON.stringify(game2.tags), null, 0);

console.log('Added:', game1.name, 'and', game2.name);

console.log('\n--- Reading all games ---');
const all = db.prepare('SELECT * FROM games ORDER BY name ASC').all().map(parseGame);
console.log(all);

console.log('\n--- Reading one game ---');
const witcher = parseGame(db.prepare('SELECT * FROM games WHERE id = ?').get(game1.id));
console.log(witcher);

console.log('\n--- Updating playtime ---');
db.prepare('UPDATE games SET total_playtime = ?, last_played = ? WHERE id = ?').run(
  120,
  new Date().toISOString(),
  game1.id
);
const updated = parseGame(db.prepare('SELECT * FROM games WHERE id = ?').get(game1.id));
console.log('Updated playtime:', updated.total_playtime, 'minutes');

console.log('\n--- Deleting Hades ---');
const result = db.prepare('DELETE FROM games WHERE id = ?').run(game2.id);
console.log('Deleted:', result.changes > 0);

console.log('\n--- Games after delete ---');
const remaining = db.prepare('SELECT * FROM games ORDER BY name ASC').all().map(parseGame);
console.log(remaining);

db.close();
console.log('\nAll done. Test db at', tmpDbPath, '(safe to delete)');
