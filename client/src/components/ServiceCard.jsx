import React from "react";

const ServiceCard = ({ title, description, location }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      <p className="text-sm text-gray-500 mt-3">
        📍 {location}
      </p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Book Service
      </button>

    </div>
  );
};

export default ServiceCard;