const express = require('express');
const { protected } = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');

const upload = require('../middleware/uploadMiddleware')

const router = express.Router();


router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getuser", protected, getUserInfo);
router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "no file uploaded" })
    };
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({ imageUrl });
});

module.exports = router;