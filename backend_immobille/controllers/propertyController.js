const Property = require('../models/propertyModel');
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const fs = require('fs');
const path = require('path');
const addProperty = asyncHandler(async (req, res) => {
  console.log(req.body); // Log the received fields
  console.log(req.files); // Log the received files

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { type, status, title, description, price, location } = req.body;
  const userId = req.user._id;

  if (!type || !status || !title || !description || !price || !location || !req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Trebuie sa completezi toate campurile cu date valide" });
  }

  const uploadedImages = [];
  const uploadPath = path.join(__dirname, '../../Immobille/src/assets/'); // Save to a dedicated uploads directory in the backend

  // Ensure the directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  if (!Array.isArray(req.files.images)) {
    req.files.images = [req.files.images];
  }

  for (const image of req.files.images) {
    const uploadFilePath = path.join(uploadPath, image.name);
    await image.mv(uploadFilePath);
    uploadedImages.push({url: `assets/${image.name}`, altText: image.name}); // Ensure URL matches the served path
  }

  try {
    const property = await Property.create({
      type,
      status,
      title,
      description,
      price,
      location,
      imageUrl: uploadedImages[0].url, // Assuming the first image is the main image
      images: uploadedImages,
      user: userId
    });

    await User.findByIdAndUpdate(userId, { $push: { properties: property._id } });

    if (!property) {
      return res.status(400).json({ message: "Invalid property data" });
    }

    return res.status(201).json({
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl,
      images: property.images,
      userId: userId
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const getProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Property.findById(propertyId).populate('user', '_id');
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      id: property._id.toString(),
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl,
      images: property.images,
      userId: property.user._id.toString()
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const updateProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;
  const { type, status, title, description, price, location, imageUrl } = req.body;

  try {
    const property = await Property.findByIdAndUpdate(propertyId, { type, status, title, description, price, location, imageUrl }, { new: true, runValidators: true });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

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
    return res.status(500).json({ message: error.message });
  }
});

const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

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
    return res.status(500).json({ message: error.message });
  }
});

const getAllProperties = asyncHandler(async (req, res) => {
  try {

    const properties = await Property.find({});

    if (!properties.length) {
      return res.status(200).json({ message: "No properties found" });
    }


    const formattedProperties = properties.map(property => ({
      id: property._id,
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl,
      images: property.images
    }));

    return res.status(200).json(formattedProperties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const properties = asyncHandler(async (req, res) => {
  try {
    const { status, type, location } = req.query;
    console.log('Received query parameters:', { status, type, location });

    let query = {};

    if (status) {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    if (type && type !== 'any') {
      query.type = { $regex: new RegExp(`^${type}$`, 'i') };
      console.log(query.type)
    }

    if (location && location !== 'any') {
      query.location = { $regex: new RegExp(`${location}`, 'i') };
    }

    const properties = await Property.find(query).exec();

    const filteredProperties = properties.filter(property => {
      let match = true;
      if (status) {
        match = match && property.status.toLowerCase().trim() === status.toLowerCase().trim();
      }
      if (type) {
        match = match && property.type.toLowerCase() === type.toLowerCase();
        console.log(property.type.toLowerCase())
      }
      if (location) {
        match = match && property.location.toLowerCase() === location.toLowerCase();
      }
      return match;
    });

    if (!filteredProperties.length) {
      return res.status(200).json({ message: "No properties found" });
    }

    const formattedProperties = filteredProperties.map(property => ({
      id: property._id,
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl
    }));

    return res.status(200).json(formattedProperties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});



const saveProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;
  console.log(req.user)
  console.log(propertyId)
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user._id;

  try {
    const property = await Property.findById(propertyId);
    console.log(property)
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const user = await User.findById(userId);
    if (user.savedAnnouncements.includes(property._id)) {
      return res.status(409).json({ message: "Property already saved" });
    }

    await User.findByIdAndUpdate(userId, { $push: { savedAnnouncements: property._id } });

    return res.status(200).json({
      id: propertyId,
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      imageUrl: property.imageUrl
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});





module.exports = {
  addProperty,
  getProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  saveProperty,
  properties,
}
