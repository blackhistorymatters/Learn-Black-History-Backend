require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Fact = require('./models/factModel.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async _ => {
  console.log('Cleared!');
  await Fact.deleteMany({});
  db.close();
});