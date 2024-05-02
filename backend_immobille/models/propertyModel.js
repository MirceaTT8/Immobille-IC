const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, default: null },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
