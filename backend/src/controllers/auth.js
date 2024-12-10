const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/constants.js');
const { getUserByEmail, createUser } = require('../models/users.js');
const { validateUserInput } = require('../utils/validators.js');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const validationError = validateUserInput(username, email, password);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        if (getUserByEmail(email)) return res.status(409).json({ error: 'Email already in use.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const info = createUser(username, email, hashedPassword);
        const token = jwt.sign({ id: info.lastInsertRowid, email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const validationError = validateUserInput('testuser', email, password);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const user = getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password.' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed.' });
    }
};

const logout = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (token) {
        jwt.sign({ token }, SECRET_KEY, { expiresIn: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } else {
        res.status(400).json({ error: 'Token not provided' });
    }
};

module.exports = { register, login, logout };