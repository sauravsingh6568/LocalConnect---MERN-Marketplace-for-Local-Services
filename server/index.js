const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===== FIX CORS ===== */

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

/* ==================== */

app.use(express.json());

/* ===== DATABASE ===== */

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✅ MongoDB Connected"))
.catch(err=> console.log(err));

/* ===== ROUTES ===== */

const serviceRoutes = require("./routes/services");

app.use("/api/services", serviceRoutes);

/* ===== TEST ROUTE ===== */

app.get("/", (req,res)=>{
  res.send("Backend running");
});

/* ===== SERVER ===== */

const PORT = 5001;

app.listen(PORT, ()=>{
  console.log(`🚀 Server running on port ${PORT}`);
});