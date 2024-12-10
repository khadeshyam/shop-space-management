const Database = require('better-sqlite3');
const db = new Database('shop.db');

module.exports = db;