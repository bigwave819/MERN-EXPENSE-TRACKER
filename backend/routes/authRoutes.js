const express = require('express');
const { protected } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const path = require('path');

const router = express.Router();

// Auth routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getuser", protected, getUserInfo);

// Image upload route
router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            success: false,
            message: "No file uploaded" 
        });
    }
    
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    
    res.status(200).json({ 
        success: true,
        imageUrl 
    });
});

module.exports = router;