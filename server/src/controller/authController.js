const userModel = require("../models/users");
const { signupValidation } = require("../validations/userValidation/signupValidation")
const { loginValidation } = require("../validations/userValidation/loginuserValidation")
const { verifySchema } = require("../validations/userValidation/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/sendEmail");



//Register Route
async function registerUser(req, res) {
    try {
        const result = signupValidation.safeParse(req.body);

        if (!result.success) {
            console.log("Validation Error:", result.error.issues);

            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: result.error.issues.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }


        const { fullname, email, password } = result.data;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //User Email Verification Expiry Time 
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verifyCodeExpiry = Date.now() + 10 * 60 * 1000;

        // Save user to DB
        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry,
            isVerified: false,
        });

        const emailSent = await sendVerificationEmail(email, verifyCode);

        if (!emailSent) {
            return res.status(500).json({
                success: false,
                message: "User registered but failed to send verification email.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        });

        // Send SINGLE response only
        return res.status(201).json({
            success: true,
            message: "Verification email sent. Please check your inbox.",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
            },
        });



    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}


//Login User
async function loginUser(req, res) {
    try {
        // Validate request body using Zod
        const result = loginValidation.safeParse(req.body);

        if (!result.success) {
            console.log("Validation Error:", error.issues);

            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.issues.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }

        const { email, password } = result.data;

        // Check if user exists
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET
        )

        // Set token cookie
        res.cookie("token", token);

        //  Send success response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

//OTP Verification
async function verifyUser(req, res) {
    try {
        const { email, verifyCode } = req.body;

        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: "User not found" });

        if (user.isVerified)
            return res.status(400).json({ success: false, message: "User already verified" });

        if (user.verifyCode !== verifyCode)
            return res.status(400).json({ success: false, message: "Invalid verification code" });

        if (user.verifyCodeExpiry < new Date())
            return res.status(400).json({ success: false, message: "Verification code expired" });

        // Update user verification status
        user.isVerified = true;
        user.verifyCode = null;
        user.verifyCodeExpiry = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error("Verification Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

//Logout User
async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User Logged Out Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    logoutUser,
}