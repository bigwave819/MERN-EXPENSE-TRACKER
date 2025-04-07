const User = require('../models/userModel')
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }) 
}

// Register User
exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body;

    // Validate Fields
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "The email is in use" });
        }

        // Create User
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl
        });

        // Send Response
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: "Error registering the user", error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate Fields
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find User
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Send Response
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
};
