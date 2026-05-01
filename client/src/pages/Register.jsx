import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getApiErrorMessage } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const isValidMobile = (value) => value.replace(/\D/g, "").length >= 10;

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setProfileImage("");
      setImagePreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("Profile image must be under 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setProfileImage(imageData);
      setImagePreview(imageData);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!mobileNumber.trim()) return "Mobile number is required";
    if (!isValidMobile(mobileNumber)) return "Enter a valid mobile number";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!location.trim()) return "Location is required";
    if (!profileImage) return "Profile image is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await register({
        name: name.trim(),
        mobileNumber: mobileNumber.trim(),
        password,
        location: location.trim(),
        profileImage
      });
      navigate("/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to register provider"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-5 shadow-md sm:p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Provider Register
        </h2>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Provider Name"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <input
            type="text"
            placeholder="Location / City"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Profile Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              onChange={handleProfileImageChange}
              required
            />
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile preview"
              className="h-20 w-20 rounded-full object-cover"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Creating account..." : "Register Provider"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
