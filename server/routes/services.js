const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

/* ADD SERVICE */

router.post("/", async (req,res)=>{
  try{

    const {title,description,location,price} = req.body;

    const service = new Service({
      title,
      description,
      location,
      price
    });

    const savedService = await service.save();

    res.status(201).json(savedService);

  }catch(err){
    res.status(500).json({message:err.message});
  }
});

/* GET ALL SERVICES */

router.get("/", async (req,res)=>{
  try{

    const services = await Service.find().sort({createdAt:-1});
    res.json(services);

  }catch(err){
    res.status(500).json({message:err.message});
  }
});

module.exports = router;