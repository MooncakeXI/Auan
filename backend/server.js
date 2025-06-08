const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const serverless = require('serverless-http');


dotenv.config({ path: './config/config.env' });

connectDB();

const wishRoutes = require('./routes/wishRoutes');
const memoryRoutes = require('./routes/memoryRoutes');

const app = express();

app.use(express.json());

app.use('/api/wishes', wishRoutes);
app.use('/api/memories', memoryRoutes);

module.exports.handler = serverless(app);