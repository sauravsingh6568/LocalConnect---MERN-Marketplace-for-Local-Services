import React, { useState } from "react";
import API from "../services/api";

const AddService = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [location,setLocation] = useState("");
  const [price,setPrice] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      const serviceData={
        title,
        description,
        location,
        price:Number(price)
      };

      await API.post("/services",serviceData);

      alert("Service Added Successfully");

      setTitle("");
      setDescription("");
      setLocation("");
      setPrice("");

    }catch(err){
      console.log(err);
      alert("Error adding service");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Add Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
          type="text"
          placeholder="Service Title"
          className="w-full border p-3 rounded-lg"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          />

          <textarea
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
          />

          <input
          type="text"
          placeholder="Location"
          className="w-full border p-3 rounded-lg"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          required
          />

          <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          required
          />

          <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
          Add Service
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddService;