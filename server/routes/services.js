const express = require("express");
const router = express.Router();
const Service = require("../models/Service");


// CREATE SERVICE
router.post("/", async (req, res) => {
  try {

    const { title, description, location, price } = req.body;

    const service = new Service({
      title,
      description,
      location,
      price
    });

    const savedService = await service.save();

    res.status(201).json(savedService);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create service",
      error: error.message
    });

  }
});


// GET ALL SERVICES
router.get("/", async (req, res) => {
  try {

    const services = await Service.find().sort({ createdAt: -1 });

    res.json(services);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message
    });

  }
});


// GET SINGLE SERVICE
router.get("/:id", async (req, res) => {
  try {

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching service",
      error: error.message
    });

  }
});


// DELETE SERVICE
router.delete("/:id", async (req, res) => {
  try {

    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting service",
      error: error.message
    });

  }
});

module.exports = router;