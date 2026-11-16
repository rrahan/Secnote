const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteid: { type: String, required: true, unique: true },
  encrypted: { type: String, required: true },
  key: { type: String, required: true },
  pwd: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, expires: 43200 }
});

module.exports = mongoose.model('Note', noteSchema);
