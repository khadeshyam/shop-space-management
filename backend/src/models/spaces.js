const db = require('../config/db.js');

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

db.exec(createSpacesTableQuery);

module.exports = {
    createSpace: (name, type, capacity, price_per_unit, user_id) => {
        const stmt = db.prepare('INSERT INTO spaces (name, type, capacity, price_per_unit, user_id) VALUES (?, ?, ?, ?, ?)');
        return stmt.run(name, type, capacity, price_per_unit, user_id);
    },
    getSpacesByUserId: (user_id) => {
        const stmt = db.prepare('SELECT * FROM spaces WHERE user_id = ?');
        return stmt.all(user_id);
    },
    getSpaceById: (id) => {
        const stmt = db.prepare('SELECT * FROM spaces WHERE id = ?');
        return stmt.get(id);
    },
    updateSpace: (id, name, type, capacity, occupied, price_per_unit, user_id) => {
        const stmt = db.prepare('UPDATE spaces SET name = ?, type = ?, capacity = ?, occupied = ?, price_per_unit = ? WHERE id = ? AND user_id = ?');
        return stmt.run(name, type, capacity, occupied, price_per_unit, id, user_id);
    },
    deleteSpace: (id) => {
        const stmt = db.prepare('DELETE FROM spaces WHERE id = ?');
        return stmt.run(id);
    }
};