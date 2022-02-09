'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Fact = require('./models/factModel');
const verifyUser = require('./auth0.js'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('/facts', handleGetfacts); 
app.post('/facts', handlePostfacts); 
app.delete('/facts/:id', handleDeletefacts); 
app.put('/facts/:id', handlePutfacts); 
app.get('/user', handleGetUser); 