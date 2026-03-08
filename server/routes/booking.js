const router = require("express").Router();
const Booking = require("../models/Booking");

router.post("/book", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json("Booking Created");
});

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
