const express = require('express');
const { createWish} = require('../controllers/wishController');
const { model } = require('mongoose');
const router = express.Router();

router.post('/', createWish);

module.exports = router;