'use strict';

const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  user: { type: String, required: true },
  people: { type: String },
  tags: { type: String },
  text: { type: String, required: true },
  source: { type: String, required: true },
});

const factModel = mongoose.model('fact', factSchema);

module.exports = factModel;
