const express = require("express")

const { getDashboardData } =  require('../controllers/dashboardController');

 const { protected } = require('../middleware/authMiddleware');

 const router = express.Router();

router.post('/', protected, getDashboardData);

module.exports = router;