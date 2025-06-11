const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");

dotenv.config({ path: './config/config.env' });

connectDB();

const wishRoutes = require('./routes/wishRoutes');
const memoryRoutes = require('./routes/memoryRoutes');

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api/wishes', wishRoutes);
app.use('/api/memories', memoryRoutes);


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);


module.exports = app;