'use strict';
const mongoose = require('mongoose');
const verifyUser = require('../auth0.js');
const { triggerAsyncId } = require('async_hooks');

const Fact = require('../models/factModel.js');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

//Allow user to get their facts
async function getUserFacts(request, response) {
  verifyUser(request, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        let queryObj = {};
        if (user.email) {
          queryObj = { email: user.email }
        }
        let factsFromDB = await Fact.find((queryObj));

        if (factsFromDB) {
          response.status(200).send(factsFromDB);
        } else {
          response.status(404).send('no facts for you!');
        }
      } catch (error) {
        console.error(error);
        response.status(500).send('server error cannot access');
      }
    }
  })
}

//Allow user to create new fact

async function createFact(request, response) {
  console.log("tried to create a fact!");
  verifyUser(request, async (err, user) => {
    console.log('user.email: ', user.email);
    console.log('request dot body: ', request.body);
    if (err) {
      response.send('invalid token');
      console.log(err);
    } else {
      const { text, source } = request.body;
      console.log("did not error immediately omg")
      try {
        console.log("try loop was hit")
        const newFact = await Fact.create({ ...request.body, user: user.email })
        console.log("new fact was successfully created!");
        response.status(200).send(newFact)
      } catch (e) {
        console.log('catch loop was hit!')
        response.status(500).send('server error');
      }
    }
  })

}

//Allow user to delete a fact by ID
async function deleteFact(request, response) {
  verifyUser(request, async (err, user) => {
    if (err) {
      response.send('invalid token');
    } else {
      try {
        const id = request.params.id;
        const email = user.email;
        console.log(id, email);

        const factDelete = await Fact.findOne({ _id: id, email: email });
        console.log(factDelete);
        if (!factDelete) {
          response.status(400).send('unable to delete fact');
          return;
        }


        await Fact.findByIdAndDelete(id);
        response.status(202).send('This fact has been removed!')
      } catch (error) {
        console.log(error);
        response.status(404).send('unable to delete fact');
      }
    }
  })
}

//Allow user to update a fact by id
async function updateFact(request, response) {
  verifyUser(request, async (err, user) => {
    if (err) {
      response.send('invalid token');
    } else {

      try {
        const id = request.params.id;
        const email = user.email;

        const factUpdate = await Fact.findOne({ _id: id, email: email })

        if (!factUpdate) {
          response.status(404).send('no updating facts for you!');
          return;
        }

        const updatedFact = await Fact.findByIdAndUpdate(id, request.body, { new: true });
        response.send(updatedFact)

      }
      catch (error) {
        console.error(error);
        response.status(500).send('We have a problem');
      }
    }
  })
}



module.exports = {
  createFact: createFact,
  deleteFact: deleteFact,
  updateFact: updateFact,
  getUserFacts: getUserFacts
};
