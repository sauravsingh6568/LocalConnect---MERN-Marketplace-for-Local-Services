import React, { useState } from "react";
import API from "../services/api";

const AddService = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const serviceData = {
      title,
      description,
      location,
      price
    };

    const res = await API.post("/services", serviceData);

    console.log(res.data);

    alert("Service added successfully");

    setTitle("");
    setDescription("");
    setLocation("");
    setPrice("");

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Service Title (e.g. Electrician)"
            className="w-full border p-3 rounded-lg"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Service Description"
            className="w-full border p-3 rounded-lg"
            rows="4"
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Add Service
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddService;