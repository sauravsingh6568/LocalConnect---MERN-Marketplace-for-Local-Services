const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

  title:{
    type:String,
    required:[true,"Service title is required"],
    trim:true
  },

  description:{
    type:String,
    required:[true,"Service description is required"],
    trim:true
  },

  category:{
    type:String,
    required:[true,"Service category is required"],
    trim:true
  },

  price:{
    type:Number,
    required:[true,"Service price is required"],
    min:[0,"Price cannot be negative"]
  },

  location:{
    type:String,
    required:[true,"Service location is required"],
    trim:true
  },

  phoneNumber:{
    type:String,
    required:[true,"Phone number is required"],
    trim:true
  },

  whatsappNumber:{
    type:String,
    required:[true,"WhatsApp number is required"],
    trim:true
  },

  image:{
    type:String,
    trim:true
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"Service provider is required"]
  }

},{timestamps:true});

module.exports = mongoose.model("Service",serviceSchema);
