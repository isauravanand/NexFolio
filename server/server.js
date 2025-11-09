require("dotenv").config({ path: "./src/.env" })
const express = require("express");
const connectDB = require("./src/DB/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

connectDB();

app.get("/",(req,res)=>{
    res.send("Hello Ai Resume builder");
})

app.use("/api/auth", authRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`App is running on the PORT ${process.env.PORT}`);
})