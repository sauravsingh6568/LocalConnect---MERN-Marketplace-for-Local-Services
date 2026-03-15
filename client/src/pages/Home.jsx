import React, { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-6">

      {services.map((service) => (
        <div key={service._id} className="bg-white p-5 shadow rounded">

          <h2 className="text-xl font-bold">{service.title}</h2>
          <p>{service.description}</p>
          <p>{service.location}</p>
          <p>₹{service.price}</p>

        </div>
      ))}

    </div>
  );
};

export default Home;