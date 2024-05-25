const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['for-sale', 'for-rent'],
    set: v => v.toLowerCase().replace(' ', '-')
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, default: null },
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
