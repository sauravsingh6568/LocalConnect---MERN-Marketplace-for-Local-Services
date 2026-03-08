import React, { useState } from "react";

const Dashboard = () => {

  const [services, setServices] = useState([
    {
      id: 1,
      title: "Electrician",
      description: "Electrical repair and installation",
      location: "Bareilly",
      price: 500
    },
    {
      id: 2,
      title: "Plumber",
      description: "Fix pipe leaks and fittings",
      location: "Bareilly",
      price: 300
    }
  ]);

  const handleDelete = (id) => {
    const updated = services.filter(service => service.id !== id);
    setServices(updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {services.map(service => (

          <div
            key={service.id}
            className="bg-white p-6 rounded-xl shadow-md"
          >

            <h2 className="text-xl font-semibold">
              {service.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {service.description}
            </p>

            <p className="text-gray-500 mt-2">
              📍 {service.location}
            </p>

            <p className="font-semibold mt-2">
              ₹ {service.price}
            </p>

            <div className="flex gap-3 mt-4">

              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                Edit
              </button>

              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Dashboard;