require("dotenv").config({ path: "./src/.env" })
const express = require("express");
const connectDB = require("./src/DB/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const resumeRoutes = require("./src/routes/resume");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

connectDB();

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api",resumeRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`App is running on the PORT ${process.env.PORT}`);
})