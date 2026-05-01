const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Service = require("../models/Service");
const auth = require("../middleware/auth");

const SERVICE_RESPONSE_FIELDS = "title description category price location phoneNumber whatsappNumber image createdBy createdAt updatedAt";
const PROVIDER_RESPONSE_FIELDS = "name mobileNumber profileImage location";

const handleServiceError = (res, err) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((error) => error.message)
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid service data" });
  }

  res.status(500).json({ message: err.message });
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ADD SERVICE */

router.post("/", auth, async (req,res)=>{
  try{

    const {
      title,
      description,
      category,
      price,
      location,
      phoneNumber,
      whatsappNumber,
      image
    } = req.body;

    const serviceData = {
      title,
      description,
      category,
      location,
      phoneNumber,
      whatsappNumber,
      createdBy:req.user._id
    };

    if (price !== undefined && price !== null && price !== "") {
      serviceData.price = Number(price);
    }

    if (image) {
      serviceData.image = image;
    }

    const service = new Service(serviceData);

    const savedService = await service.save();
    await savedService.populate("createdBy", PROVIDER_RESPONSE_FIELDS);

    res.status(201).json(savedService);

  }catch(err){
    handleServiceError(res, err);
  }
});


/* GET ALL SERVICES */

router.get("/", async (req,res)=>{
  try{

    const services = await Service.find({ createdBy: { $exists: true, $ne: null } })
      .select(SERVICE_RESPONSE_FIELDS)
      .populate("createdBy", PROVIDER_RESPONSE_FIELDS)
      .sort({createdAt:-1});

    res.json(services);

  }catch(err){
    handleServiceError(res, err);
  }
});

/* GET LOGGED-IN PROVIDER SERVICES */

router.get("/user", auth, async (req,res)=>{
  try{

    const services = await Service.find({ createdBy:req.user._id })
      .select(SERVICE_RESPONSE_FIELDS)
      .populate("createdBy", PROVIDER_RESPONSE_FIELDS)
      .sort({createdAt:-1});

    res.json(services);

  }catch(err){
    handleServiceError(res, err);
  }
});

/* GET SINGLE SERVICE */

router.get("/:id", async (req,res)=>{
  try{

    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message:"Invalid service id" });
    }

    const service = await Service.findById(id)
      .select(SERVICE_RESPONSE_FIELDS)
      .populate("createdBy", PROVIDER_RESPONSE_FIELDS);

    if (!service) {
      return res.status(404).json({ message:"Service not found" });
    }

    if (!service.createdBy) {
      return res.status(404).json({ message:"Service provider not found" });
    }

    res.json(service);

  }catch(err){
    handleServiceError(res, err);
  }
});

/* DELETE SERVICE */

router.delete("/:id", auth, async (req,res)=>{
  try{

    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message:"Invalid service id" });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message:"Service not found" });
    }

    if (service.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message:"You can delete only your own services" });
    }

    await service.deleteOne();

    res.json({ message:"Service deleted successfully" });

  }catch(err){
    handleServiceError(res, err);
  }
});

module.exports = router;
