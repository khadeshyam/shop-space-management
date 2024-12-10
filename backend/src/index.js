const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator'); 

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    if (!validator.isLength(username, { min: 3 })) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
    }

    try {
        // Check if user already exists
        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
        const info = stmt.run(username, email, hashedPassword);
        const token = jwt.sign({ id: info.lastInsertRowid, email }, SECRET_KEY);
        res.status(201).json({ token, user_id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User registration failed due to server error.' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        res.status(200).json({ token, user_id: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed due to server error.' });
    }
});

// Get all spaces for a specific user by ID
app.get('/api/users/:id/spaces', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Validate user ID
    if (!validator.isInt(id, { min: 1 })) {
        return res.status(400).json({ error: 'Invalid user ID format.' });
    }

    // Verify authorization
    if (parseInt(id, 10) !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const spaces = db.prepare('SELECT * FROM spaces WHERE user_id = ?').all(id);
        res.json(spaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve spaces due to server error.' });
    }
});

// Get all spaces for authenticated user
app.get('/api/spaces', authenticateToken, (req, res) => {
    try {
        const spaces = db.prepare('SELECT * FROM spaces WHERE user_id = ?').all(req.user.id);
        res.json(spaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve spaces due to server error.' });
    }
});

// Get a single space by ID for authenticated user
app.get('/api/spaces/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Validate space ID
    if (!validator.isInt(id, { min: 1 })) {
        return res.status(400).json({ error: 'Invalid space ID format.' });
    }

    try {
        const space = db.prepare('SELECT * FROM spaces WHERE id = ? AND user_id = ?').get(id, req.user.id);
        if (space) {
            res.json(space);
        } else {
            res.status(404).json({ error: 'Space not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve space due to server error.' });
    }
});

// Add a new space for authenticated user
app.post('/api/spaces', authenticateToken, (req, res) => {
    const { name, type, capacity, price_per_unit } = req.body;

    // Validate input
    if (!name || !type || capacity === undefined || price_per_unit === undefined) {
        return res.status(400).json({ error: 'Name, type, capacity, and price_per_unit are required.' });
    }

    if (!validator.isLength(name, { min: 1 })) {
        return res.status(400).json({ error: 'Name must be at least 1 character long.' });
    }

    if (!['hanger', 'shelf'].includes(type)) {
        return res.status(400).json({ error: 'Type must be either "hanger" or "shelf".' });
    }

    if (!validator.isInt(capacity.toString(), { min: 1 })) {
        return res.status(400).json({ error: 'Capacity must be a positive integer.' });
    }

    if (!validator.isFloat(price_per_unit.toString(), { min: 0 })) {
        return res.status(400).json({ error: 'Price per unit must be a positive number.' });
    }

    try {
        const stmt = db.prepare('INSERT INTO spaces (name, type, capacity, price_per_unit, user_id) VALUES (?, ?, ?, ?, ?)');
        const info = stmt.run(name, type, capacity, price_per_unit, req.user.id);
        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add space due to server error.' });
    }
});

// Update a space for authenticated user
app.put('/api/spaces/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, type, capacity, occupied, price_per_unit } = req.body;

    // Validate space ID
    if (!validator.isInt(id, { min: 1 })) {
        return res.status(400).json({ error: 'Invalid space ID format.' });
    }

    // Validate input
    if (!name || !type || capacity === undefined || price_per_unit === undefined) {
        return res.status(400).json({ error: 'Name, type, capacity, and price_per_unit are required.' });
    }

    if (!validator.isLength(name, { min: 1 })) {
        return res.status(400).json({ error: 'Name must be at least 1 character long.' });
    }

    if (!['hanger', 'shelf'].includes(type)) {
        return res.status(400).json({ error: 'Type must be either "hanger" or "shelf".' });
    }

    if (!validator.isInt(capacity.toString(), { min: 1 })) {
        return res.status(400).json({ error: 'Capacity must be a positive integer.' });
    }

    if (occupied !== undefined && !validator.isInt(occupied.toString(), { min: 0 })) {
        return res.status(400).json({ error: 'Occupied must be a non-negative integer.' });
    }

    if (!validator.isFloat(price_per_unit.toString(), { min: 0 })) {
        return res.status(400).json({ error: 'Price per unit must be a positive number.' });
    }

    try {
        const stmt = db.prepare('UPDATE spaces SET name = ?, type = ?, capacity = ?, occupied = ?, price_per_unit = ? WHERE id = ? AND user_id = ?');
        const info = stmt.run(name, type, capacity, occupied || 0, price_per_unit, id, req.user.id);
        if (info.changes > 0) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ error: 'Space not found or not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update space due to server error.' });
    }
});

// Delete a space for authenticated user
app.delete('/api/spaces/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    // Validate space ID
    if (!validator.isInt(id, { min: 1 })) {
        return res.status(400).json({ error: 'Invalid space ID format.' });
    }

    try {
        const stmt = db.prepare('DELETE FROM spaces WHERE id = ? AND user_id = ?');
        const info = stmt.run(id, req.user.id);
        if (info.changes > 0) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ error: 'Space not found or not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete space due to server error.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});