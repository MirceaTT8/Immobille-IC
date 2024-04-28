const express = require("express");
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser } = require("../controllers/userController");
const { addProperty, getProperty, updateProperty, deleteProperty, getAllProperties} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);

router.patch("/updateUser", protect, updateUser);

router.post("/addProperty", addProperty);
router.get("/getProperty/:id",getProperty);
router.get("/getAllProperties/",getAllProperties);
router.put("/updateProperty/:id", updateProperty);
router.delete("/deleteProperty/:id", deleteProperty);



module.exports = router;
