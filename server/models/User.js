const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provider name is required"],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: [true, "Provider location is required"],
    trim: true
  },
  profileImage: {
    type: String,
    required: [true, "Provider profile image is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
