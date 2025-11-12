const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ success: false, message: "Access Denied , Please Login First" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) return res.status(401).json({ success: false, message: "Invalid Token" });

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

module.exports = verifyToken;
