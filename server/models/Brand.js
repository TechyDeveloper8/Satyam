const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    logo: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
