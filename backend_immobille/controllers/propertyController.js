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

const updateProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;  // Get ID from the URL parameter
  const { type, status, title, description, price, location, imageUrl } = req.body;

  try {
    const property = await Property.findByIdAndUpdate(propertyId, { type, status, title, description, price, location, imageUrl }, { new: true, runValidators: true });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Send updated property data
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
    // Handle possible errors from findByIdAndUpdate or other operations
    return res.status(500).json({ message: error.message });
  }
});

const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Assuming the URL parameter to identify the property is 'id'

  if (!id) {
    return res.status(400).json({ message: "Property ID is required" });
  }

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await property.remove();
    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    // Handle possible errors from Property.findById or property.remove
    return res.status(500).json({ message: error.message });
  }
});

const getAllProperties = asyncHandler(async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find({});

    // If no properties are found, you might want to return an empty array with a 200 OK status
    if (!properties.length) {
      return res.status(200).json({ message: "No properties found" });
    }

    // Map properties to format the response if needed or send them as they are
    const formattedProperties = properties.map(property => ({
      id: property._id,
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl // Ensure to check if all properties have imageUrl if it's required in the response
    }));

    // Send the list of formatted properties
    return res.status(200).json(formattedProperties);
  } catch (error) {
    // Handle any errors that might occur during the database query
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  addProperty,getProperty,getAllProperties, updateProperty, deleteProperty
}
