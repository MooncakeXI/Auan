const express = require('express');
const { getMemories, getMemorie } = require('../controllers/memoryController');

const router = express.Router();

router.get('/', getMemories);
router.get('/:id', getMemorie);

module.exports = router;