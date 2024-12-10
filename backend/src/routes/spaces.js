const express = require('express');
const {
    getAllSpacesForUser,
    fetchAllSpaces,
    getSpaceById,
    addSpace,
    updateSpace,
    deleteSpace
} = require('../controllers/spaces.js');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/users/:id/spaces', authenticateToken, getAllSpacesForUser);
router.get('/spaces', authenticateToken, fetchAllSpaces);
router.get('/spaces/:id', authenticateToken, getSpaceById);
router.post('/spaces', authenticateToken, addSpace);
router.put('/spaces/:id', authenticateToken, updateSpace);
router.delete('/spaces/:id', authenticateToken, deleteSpace);

module.exports = router;