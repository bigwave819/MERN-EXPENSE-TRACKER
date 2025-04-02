const express = require("express");
const { getDashboardData } = require('../controllers/dashboardController');
const { protected } = require('../middleware/authMiddleware');

const router = express.Router();

// Ensure correct route
router.get('/dashboard/add', protected, getDashboardData);

module.exports = router;
