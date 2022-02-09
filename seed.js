require('dotenv').config();
const mongoose = require('mongoose');

const Fact = require('./models/factModel.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');
  
  seedFacts();

  async function seedFacts() {
    console.log('seeding facts...');

    await Fact.create({})
    console.log('done seeding');

    db.close();

  }
});