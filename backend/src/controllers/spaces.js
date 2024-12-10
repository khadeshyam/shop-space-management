const { 
    createSpace: createSpaceModel, 
    getSpacesByUserId: getSpacesByUserIdModel, 
    getSpaceById: getSpaceByIdModel, 
    updateSpace: updateSpaceModel, 
    deleteSpace: deleteSpaceModel, 
    getAllSpaces: getAllSpacesModel 
} = require('../models/spaces.js');
const { validateSpaceInput } = require('../utils/validators');

const getAllSpacesForUser = (req, res) => {
    const user_id = req.user.id;

    try {
        const spaces = getSpacesByUserIdModel(user_id);
        res.status(200).json(spaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve spaces.' });
    }
};

const fetchAllSpaces = (req, res) => {
    try {
        const spaces = getAllSpacesModel();
        res.status(200).json(spaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve spaces.' });
    }
};

const getSpaceById = (req, res) => {
    const { id } = req.params;

    try {
        const space = getSpaceByIdModel(id);
        if (!space) return res.status(404).json({ error: 'Space not found.' });
        res.status(200).json(space);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve space.' });
    }
};

const addSpace = (req, res) => {
    const { name, type, capacity, price_per_unit } = req.body;
    const user_id = req.user.id;

    const validationError = validateSpaceInput(name, type, capacity, price_per_unit);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const info = createSpaceModel(name, type, capacity, price_per_unit, user_id);
        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create space.' });
    }
};

const updateSpace = (req, res) => {
    const { id } = req.params;
    const { name, type, capacity, occupied, price_per_unit } = req.body;
    const user_id = req.user.id;

    const validationError = validateSpaceInput(name, type, capacity, price_per_unit);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const info = updateSpaceModel(id, name, type, capacity, occupied, price_per_unit, user_id);
        if (info.changes === 0) return res.status(404).json({ error: 'Space not found.' });
        res.status(200).json({ message: 'Space updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update space.' });
    }
};

const deleteSpace = (req, res) => {
    const { id } = req.params;

    try {
        const info = deleteSpaceModel(id);
        if (info.changes === 0) return res.status(404).json({ error: 'Space not found.' });
        res.status(200).json({ message: 'Space deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete space.' });
    }
};

module.exports = { getAllSpacesForUser, fetchAllSpaces, getSpaceById, addSpace, updateSpace, deleteSpace };