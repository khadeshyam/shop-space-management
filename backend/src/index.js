const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all spaces
app.get('/api/spaces', (req, res) => {
    const spaces = db.prepare('SELECT * FROM spaces').all();
    res.json(spaces);
});

// Get a single space by ID
app.get('/api/spaces/:id', (req, res) => {
    const { id } = req.params;
    const space = db.prepare('SELECT * FROM spaces WHERE id = ?').get(id);
    if (space) {
        res.json(space);
    } else {
        res.status(404).json({ error: 'Space not found' });
    }
});


// Add a new space
app.post('/api/spaces', (req, res) => {
    const { name, type, capacity, price_per_unit } = req.body;
    const stmt = db.prepare('INSERT INTO spaces (name, type, capacity, price_per_unit) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, type, capacity, price_per_unit);
    res.json({ id: info.lastInsertRowid });
});

// Update a space
app.put('/api/spaces/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, capacity, occupied, price_per_unit } = req.body;
    const stmt = db.prepare('UPDATE spaces SET name = ?, type = ?, capacity = ?, occupied = ?, price_per_unit = ? WHERE id = ?');
    stmt.run(name, type, capacity, occupied, price_per_unit, id);
    res.sendStatus(200);
});

// Delete a space
app.delete('/api/spaces/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM spaces WHERE id = ?');
    stmt.run(id);
    res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});