const express = require("express");
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser , updatePhoto} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);

router.patch("/updateUser", protect, updateUser);


module.exports = router;