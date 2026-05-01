const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const User = require("./models/User");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT = process.env.PORT || 5001;

/* ===== CORS ===== */

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

/* ==================== */

app.use(express.json({ limit: "2mb" }));

/* ===== DATABASE ===== */

mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{
  await User.syncIndexes();
  console.log("✅ MongoDB Connected");
})
.catch(err=> console.error("MongoDB connection error:", err.message));

/* ===== ROUTES ===== */

const serviceRoutes = require("./routes/services");
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

/* ===== TEST ROUTE ===== */

app.get("/", (req,res)=>{
  res.send("Backend running");
});

/* ===== SERVER ===== */

app.listen(PORT, ()=>{
  console.log(`🚀 Server running on port ${PORT}`);
});
