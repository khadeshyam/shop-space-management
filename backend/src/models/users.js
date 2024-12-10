const db = require('../config/db.js');

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL CHECK(length(username) >= 3),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK(length(password) >= 8),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`;

db.exec(createUsersTableQuery);

module.exports = {
    createUser: (username, email, password) => {
        const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
        return stmt.run(username, email, password);
    },
    getUserByEmail: (email) => {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return stmt.get(email);
    }
};