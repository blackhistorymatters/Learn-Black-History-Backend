'use strict';
const mongoose = require('mongoose');
const verifyUser = require('../auth0.js'); 
const { triggerAsyncId } = require('async_hooks');

const Fact = require('../models/factModel.js');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

//Allow user to create new fat

async function createFact(request, response) {

  verifyUser(request, async (err, user) => {
    if (err) {
      response.send('invalid token');
    } else {
      const { text, source } = request.body;
      try {
        const newFact = await Fact.create({ ...request.body, email: user.email })
        response.status(200).send(newFact)
      } catch (e) {
        response.status(500).send('server error');
      }
    }
  })

}

//Allow user to delete a fact by ID
async function deleteFact(request, response) {
  try {
    const id = request.params.id;
    const email = request.query.email;
    console.log(id);

    // const book = await Fact.findOne({ _id: id, email: email });
    const book = await Fact.findOne({ _id: id});
    console.log(fact);
    if (!fact) {
      response.status(400).send('unable to delete fact');
      return;
    }

    // if (fact.email !== email) {
    //   response.status(400).send('unable to delete fact');
    // }
    await Fact.findByIdAndDelete(id);
    response.status(202).send('This fact has been removed!')
  } catch (error) {
    console.log(error);
    response.status(404).send('unable to delete fact');
  }
}

//Allow user to update a fact by id
async function updateFact(request, response) {

  try {
    const id = request.params.id;
    const email = request.query.email;

    const factUpdate = await Fact.findOne({ _id: id, email: email })

    if (!factUpdate) {
      response.status(404).send('no facts for you!');
      return;
    }
    if (factUpdate.email !== email) {
      response.status(400).send('unable to update fact');
      return;
    }
    const updatedFact = await Fact.findByIdAndUpdate(id, request.body, { new: true});
    response.send(updatedFact)

  }
  catch (error) {
    console.error(error);
    response.status(500).send('We have a problem');
  }
}



module.exports = {
  createFact: createFact, 
  deleteFact: deleteFact,
  updateFact: updateFact
};
