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
  description: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 100;
      },
      message: props => `Description should be at least 100 characters long. Currently, it has ${props.value.length} characters.`
    }
  },
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
  },
  cif: { type: String, required: true }
});


const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
