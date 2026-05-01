const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET || "localconnect_dev_secret";

const createToken = (provider) => {
  return jwt.sign(
    { id: provider._id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const formatProvider = (provider) => ({
  id: provider._id,
  name: provider.name,
  mobileNumber: provider.mobileNumber,
  location: provider.location,
  profileImage: provider.profileImage
});

const normalizeMobileNumber = (mobileNumber) => {
  return String(mobileNumber || "").replace(/\D/g, "");
};

const handleAuthError = (res, err) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Mobile number already registered" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((error) => error.message)
    });
  }

  res.status(500).json({ message: err.message });
};

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      mobile,
      password,
      location,
      profileImage
    } = req.body;

    const normalizedMobileNumber = normalizeMobileNumber(mobileNumber || mobile);

    if (!name || !normalizedMobileNumber || !password || !location || !profileImage) {
      return res.status(400).json({
        message: "Name, mobile number, password, location and profile image are required"
      });
    }

    if (normalizedMobileNumber.length < 10) {
      return res.status(400).json({ message: "Enter a valid mobile number" });
    }

    const existingProvider = await User.findOne({ mobileNumber: normalizedMobileNumber });

    if (existingProvider) {
      return res.status(409).json({ message: "Provider already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const provider = new User({
      name,
      mobileNumber: normalizedMobileNumber,
      location,
      profileImage,
      password: hashed
    });

    await provider.save();

    const token = createToken(provider);

    res.status(201).json({
      message: "Provider registered successfully",
      token,
      provider: formatProvider(provider)
    });
  } catch (err) {
    handleAuthError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { mobileNumber, mobile, password } = req.body;
    const normalizedMobileNumber = normalizeMobileNumber(mobileNumber || mobile);

    if (!normalizedMobileNumber || !password) {
      return res.status(400).json({ message: "Mobile number and password are required" });
    }

    const provider = await User.findOne({ mobileNumber: normalizedMobileNumber });

    if (!provider) {
      return res.status(401).json({ message: "Invalid provider credentials" });
    }

    const valid = await bcrypt.compare(password, provider.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid provider credentials" });
    }

    const token = createToken(provider);

    res.json({
      message: "Provider logged in successfully",
      token,
      provider: formatProvider(provider)
    });
  } catch (err) {
    handleAuthError(res, err);
  }
});

router.get("/me", auth, (req, res) => {
  res.json({ provider: formatProvider(req.user) });
});

module.exports = router;
