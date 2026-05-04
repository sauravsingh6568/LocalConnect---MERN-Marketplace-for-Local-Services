const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===== MODELS ===== */
const User = require("./models/User");

/* ===== CONFIG ===== */
const PORT = process.env.PORT || 5001;

/* ===== CORS CONFIG (FIXED) ===== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://localconnectmernproject.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed: " + origin));
    }
  },
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

/* ===== MIDDLEWARE ===== */
app.use(express.json({ limit: "2mb" }));

/* ===== DATABASE ===== */
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await User.syncIndexes();
    console.log("✅ MongoDB Connected");
  })
  .catch(err => console.error("❌ MongoDB Error:", err.message));

/* ===== ROUTES ===== */
const serviceRoutes = require("./routes/services");
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully");
});

/* ===== ERROR HANDLER (IMPORTANT) ===== */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* ===== SERVER ===== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});