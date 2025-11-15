const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  code: { type: String, required: true },
  language: { type: String, default: 'text' },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Snippet', SnippetSchema);

