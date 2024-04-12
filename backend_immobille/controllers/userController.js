const asyncHandler= require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const e = require("express");
// const { use } = require("../routes/userRoute");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


//Register user

const registerUser = asyncHandler(async(req, res) => {
    console.log("Received registration request with data:", req.body);
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Trebuie sa completezi toate campurile cu date valide" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Parola trebuie sa aiba minim 6 caractere" });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "Email-ul exista deja" });
    }

    // Create new user
    try {
        const user = await User.create({ name, email, password });
        if (!user) {
            return res.status(400).json({ message: "Invalid user data" });
        }

        // Generate token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000*86400),
            // secure: true, // Uncomment if using https
            // sameSite: "None" // Adjust based on your cross-site requirements
        });

        // Send user data
        return res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role, // assuming role is part of user model
            token
        });

    } catch (error) {
        // Handle possible errors from User.create or other async operations
        return res.status(500).json({ message: error.message });
    }
});

//Login user
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    
    // Validate request
    if (!email || !password) {
        return res.status(400).json({ error: "Please add email and password" });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    // User exists, check if pass is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate Token
    const token = generateToken(user._id);

    // Set the cookie with the token
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000*86400),
        //secure: true, // Uncomment if using https
        //sameSite: "None" // Adjust based on your cross-site requirements
    });

    // Send user data without password
    return res.status(200).json({ _id: user._id, email: user.email, token });
});

//logout
const logout = asyncHandler( async (req, res) =>{
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
   const user = await User.findById(req.user._id).select("-password")
   if(user) {
    res.status(200).json(user);
   }
   else{
    res.status(400);
    throw new Error("User not found");
   }
});

//get login status

const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json(false);
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch (error) {
        // If verification fails for any reason, consider the user not logged in
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
    
};

