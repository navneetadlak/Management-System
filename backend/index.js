const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db')
const dotenv = require('dotenv');
dotenv.config();
const app = express();

connectDB();

// middleware 
app.use(express.json()); //parsing incoming json request
app.use(cors()); //enable cors for cross orgin resourse sharing request

// default / route 
app.get('/', (req, res)=>{
    res.send("task manager is running......")
});

// error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
  });

// starting the server
const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});