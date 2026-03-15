const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= CORS FIX ================= */

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type"]
}));

/* ============================================ */

app.use(express.json());

/* ================= DATABASE ================= */

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✅ MongoDB Connected"))
.catch(err=> console.log(err));

/* ================= ROUTES ================= */

app.use("/api/services", require("./routes/services"));

/* ================= TEST ================= */

app.get("/",(req,res)=>{
  res.send("Backend running");
});

/* ================= SERVER ================= */

const PORT = 5000;

app.listen(PORT,()=>{
  console.log(`🚀 Server running on port ${PORT}`);
});