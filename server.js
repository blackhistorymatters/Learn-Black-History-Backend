'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const factHandler = require('./apiHandlers/FactHandler.js')
const tagHandler = require('./apiHandlers/TagHandler.js')
const peopleHandler = require('./apiHandlers/PeopleHandler.js')
const verifyUser = require('./auth0.js')
const dataBaseFacts
 = require('./mongoHandlers/dataBaseFacts.js')

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


// app.get('/user', handleGetUser); 

  //API Calls to blackhistoryapi
  app.get('/facts', factHandler.getAllFacts);
  app.get('/fact', tagHandler.getFactByTag);
  app.get('/people', peopleHandler.getFactByPeople);
  
  //Mongoose functions accessing database stored facts
  app.post('/facts', dataBaseFacts.createFact);
  app.delete('/facts/:id', dataBaseFacts
  .deleteFact);
  app.put('/facts/:id', dataBaseFacts.updateFact);
  app.get('/user', handleGetUser);

  function handleGetUser(req, res) {
    verifyUser(req, (err, user) => {
      if (err) {
        res.send('This token is invalid');
      } else {
        res.send(user);
      }
    })
  }

app.listen(PORT, () => console.log(`listening on ${PORT}`));