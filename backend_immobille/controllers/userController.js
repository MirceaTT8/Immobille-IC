const asyncHandler= require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const e = require("express");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

const registerUser = asyncHandler(async(req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Trebuie sa completezi toate campurile cu date valide" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Parola trebuie sa aiba minim 6 caractere" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "Email-ul exista deja" });
    }


    try {
        const user = await User.create({ name, email, password });
        if (!user) {
            return res.status(400).json({ message: "Invalid user data" });
        }


        const token = generateToken(user._id);


        res.cookie("token", token, {
            path: "/",
            // httpOnly: true,
            expires: new Date(Date.now() + 1000*86400),
            // domain: "http://localhost:4200/",
            // secure: true, // Uncomment if using https
            // sameSite: "None" // Adjust based on your cross-site requirements
        });


        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });

    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password, properties} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please add email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    console.log(token)

    res.cookie("token", token, {
        path: "/",
        // httpOnly: true,
        expires: new Date(Date.now() + 1000*86400),
        // domain: "http://localhost:4200/",
        //secure: true, // Uncomment if using https
        // sameSite: "None" // Adjust based on your cross-site requirements
    });

    return res.status(200).json({ _id: user._id, email: user.email, properties: user.properties, token });
});


const logout = asyncHandler( async (req, res) =>{
  console.log(req.user)
    res.cookie("token", "", {
        path: "/",
        httpOnly:true,
        expires:new Date(0),
        //secure:true,
        //sameSite:none;
    });
    return res.status(200).json({message : "Logged Out"});
});
//Get user
const getUser = asyncHandler(async (req, res) => {

  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate('properties')
      .exec();

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        properties: user.properties
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user details: " + error.message });
  }
});

const getUserProperties = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate('properties')
      .exec();

    if (user && user.properties) {
      res.status(200).json(user.properties);
    } else {
      res.status(404).json({ message: "No properties found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user properties: " + error.message });
  }
});

const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json(false);
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch (error) {

        return res.json(false);
    }
});
//update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        const{ name} = user;
        user.name = req.body.name || name;
        const updateUser = await user.save()
        res.status(200).json(updateUser);
    }
    else{
        e.status(404);
        throw new Error(" User not found");
    }
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    getUserProperties
};

