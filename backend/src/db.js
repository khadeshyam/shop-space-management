const Database = require('better-sqlite3');
const db = new Database('shop.db');

// Enhanced Users Table with additional constraints
const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL CHECK(length(username) >= 3),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK(length(password) >= 8),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`;

// Enhanced Spaces Table with additional constraints
const createSpacesTableQuery = `
    CREATE TABLE IF NOT EXISTS spaces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL CHECK(length(name) >= 1),
        type TEXT CHECK(type IN ('hanger', 'shelf')) NOT NULL,
        capacity INTEGER NOT NULL CHECK(capacity > 0),
        occupied INTEGER DEFAULT 0 CHECK(occupied >= 0),
        price_per_unit DECIMAL(10,2) NOT NULL CHECK(price_per_unit >= 0),
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

// Execute table creation queries
db.exec(createUsersTableQuery);
db.exec(createSpacesTableQuery);

module.exports = db;