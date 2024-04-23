const Property = require('../models/propertyModel');
const asyncHandler = require("express-async-handler");

const addProperty = asyncHandler( async (req, res) =>{
  const { type, status, title, description,price,location,imageUrl } = req.body;

  if (!type || !status || !title || !description || !price || !location || !imageUrl) {
    return res.status(400).json({ message: "Trebuie sa completezi toate campurile cu date valide" });
  }

  try {
    const property = await Property.create({ type, status, title, description,price,location,imageUrl });
    if (!property) {
      return res.status(400).json({ message: "Invalid property data" });
    }

    // Send user data
    return res.status(201).json({
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl
    });

  } catch (error) {
    // Handle possible errors from User.create or other async operations
    return res.status(500).json({ message: error.message });
  }

});

const getProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;  // Assuming the ID is passed as a URL parameter

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Send property data
    return res.status(200).json({
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl
    });

  } catch (error) {
    // Handle possible errors from findById or other operations
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  addProperty,getProperty
}
