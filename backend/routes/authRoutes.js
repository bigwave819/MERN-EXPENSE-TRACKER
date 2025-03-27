const express = require('express')

const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController')

const router = express.Router()


router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/getuser", protected, getUserInfo)

module.exports = router;