require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const connectDB = require("./src/DB/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const resumeRoutes = require("./src/routes/resume");
const aiRoutes = require("./src/routes/aiRoutes");
const cookieParser = require("cookie-parser");

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    "https://nex-folio.vercel.app",
    "http://localhost:5173", 
    "http://localhost:3000"  
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Connect to Database
connectDB();

// Middleware
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", resumeRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000; // Fallback to 5000 if env is missing
app.listen(PORT, () => {
    console.log(`App is running on the PORT ${PORT}`);
});