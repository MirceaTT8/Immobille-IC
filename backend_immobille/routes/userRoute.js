const express = require("express");
const { registerUser,
  loginUser,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  getUserProperties,
  getUserSavedProperties} = require("../controllers/userController");
const {
  addProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  saveProperty,
  properties} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const path = require("node:path");
const router = express.Router();


router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout",protect, logout);
router.get("/auth/getUserProperties",protect,getUserProperties)
router.get("/auth/getUserSavedProperties",protect,getUserSavedProperties)
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);

router.patch("/updateUser/:id", protect, updateUser);

router.post("/addProperty", protect, addProperty);
router.get("/getProperty/:id",getProperty);
router.get("/getAllProperties",getAllProperties);
router.get("/properties", properties);
router.put("/updateProperty/:id", updateProperty);
router.delete("/deleteProperty/:id", deleteProperty);

router.post("/saveProperty/:id", protect, saveProperty);





module.exports = router;
