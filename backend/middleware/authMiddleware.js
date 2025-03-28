const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protected = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        console.error("Internal server error:", error);  // Log the actual error for debugging
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }    
};
