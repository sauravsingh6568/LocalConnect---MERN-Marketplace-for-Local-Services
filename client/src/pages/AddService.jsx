import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API, { getApiErrorMessage } from "../services/api";
import { useAuth } from "../context/useAuth";

const AddService = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const [location,setLocation] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [whatsappNumber,setWhatsappNumber] = useState("");
  const [image,setImage] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const { isAuthenticated, provider } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (provider?.mobileNumber) {
      setPhoneNumber((current) => current || provider.mobileNumber);
      setWhatsappNumber((current) => current || provider.mobileNumber);
    }

    if (provider?.location) {
      setLocation((current) => current || provider.location);
    }
  }, [provider]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isValidPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const isValidUrl = (value) => {
    if (!value.trim()) {
      return true;
    }

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    if (!title.trim()) return "Title is required";
    if (!description.trim()) return "Description is required";
    if (!category.trim()) return "Category is required";
    if (!price.trim()) return "Price is required";
    if (Number(price) < 0) return "Price cannot be negative";
    if (!location.trim()) return "Location is required";
    if (!phoneNumber.trim()) return "Phone number is required";
    if (!isValidPhone(phoneNumber)) return "Enter a valid phone number";
    if (!whatsappNumber.trim()) return "WhatsApp number is required";
    if (!isValidPhone(whatsappNumber)) return "Enter a valid WhatsApp number";
    if (!isValidUrl(image)) return "Enter a valid image URL";
    return "";
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try{
      setLoading(true);

      const serviceData={
        title:title.trim(),
        description:description.trim(),
        category:category.trim(),
        location:location.trim(),
        phoneNumber:phoneNumber.trim(),
        whatsappNumber:whatsappNumber.trim()
      };

      if (price) {
        serviceData.price = Number(price);
      }

      if (image.trim()) {
        serviceData.image = image.trim();
      }

      await API.post("/services",serviceData);

      navigate("/dashboard");

    }catch(err){
      setError(getApiErrorMessage(err, "Error adding service"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6">

      <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-5 shadow-md sm:p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Add Service
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
          type="text"
          placeholder="Service Title"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          />

          <textarea
          placeholder="Description"
          className="min-h-28 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
          />

          <input
          type="text"
          placeholder="Category"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          required
          />

          <input
          type="number"
          placeholder="Price"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          min="0"
          required
          />

          <input
          type="text"
          placeholder="Location"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          required
          />

          <input
          type="tel"
          placeholder="Phone Number"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={phoneNumber}
          onChange={(e)=>setPhoneNumber(e.target.value)}
          required
          />

          <input
          type="tel"
          placeholder="WhatsApp Number"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={whatsappNumber}
          onChange={(e)=>setWhatsappNumber(e.target.value)}
          required
          />

          <input
          type="url"
          placeholder="Image URL (optional)"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
          />

          <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
          {loading ? "Adding..." : "Add Service"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddService;
