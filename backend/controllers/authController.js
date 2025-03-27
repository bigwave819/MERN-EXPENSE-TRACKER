const jwt = require("jasonwebtoken")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE, { expiresIn: "1h" })
}

exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body

    if (!fullname || !email || !password ) {
        return res.status().json()
    }
};

exports.loginUser = async (req, res) => {};

exports.getUserInfo = async (req, res) => {};