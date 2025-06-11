const express = require('express');
const { getMemories, getMemorie, createMemory } = require('../controllers/memoryController');

const router = express.Router();

router.get('/', getMemories);
router.get('/:id', getMemorie);
router.post('/', createMemory);

module.exports = router;