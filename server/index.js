const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Error:", err);
});


// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/services"));
app.use("/api/bookings", require("./routes/bookings"));


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 LocalConnect Backend Running");
});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});