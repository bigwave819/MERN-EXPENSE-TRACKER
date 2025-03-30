const express = require("express");
const { getDashboardData } = require('../controllers/dashboardController');
const { protected } = require('../middleware/authMiddleware');

const router = express.Router();

// Ensure correct route
router.get('/dashboard', protected, getDashboardData); // ✅ Changed '/' to '/dashboard'

module.exports = router;
