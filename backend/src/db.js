const Database = require('better-sqlite3');
const db = new Database('shop.db');

const createTableQuery = `
	CREATE TABLE IF NOT EXISTS spaces (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		type TEXT CHECK(type IN ('hanger', 'shelf')) NOT NULL,
		capacity INTEGER NOT NULL,
		occupied INTEGER DEFAULT 0,
		price_per_unit DECIMAL(10,2) NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
`;

db.exec(createTableQuery);
module.exports = db;