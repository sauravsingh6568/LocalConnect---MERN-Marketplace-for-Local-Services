const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: String,
  serviceId: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Booking", BookingSchema);
