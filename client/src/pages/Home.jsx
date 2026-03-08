import React from "react";
import ServiceCard from "../components/ServiceCard";

const Home = () => {

  const services = [
    {
      title: "Electrician",
      description: "Expert electrical repair and installation services.",
      location: "Bareilly"
    },
    {
      title: "Plumber",
      description: "Fix leaks, pipes and bathroom fittings quickly.",
      location: "Bareilly"
    },
    {
      title: "Home Tutor",
      description: "Personal tutors for school and college subjects.",
      location: "Bareilly"
    },
    {
      title: "Car Mechanic",
      description: "Reliable car repair and servicing near you.",
      location: "Bareilly"
    },
    {
      title: "AC Repair",
      description: "Fast air conditioner repair and installation.",
      location: "Bareilly"
    },
    {
      title: "House Cleaning",
      description: "Professional home and office cleaning service.",
      location: "Bareilly"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">

      <div className="text-center mt-16">

        <h1 className="text-4xl font-bold text-gray-800">
          Find Trusted Local Services
        </h1>

        <p className="text-gray-600 mt-3">
          Book electricians, plumbers, tutors and more near you.
        </p>

      </div>

      {/* SERVICES GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">

        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            location={service.location}
          />
        ))}

      </div>

    </div>
  );
};

export default Home;