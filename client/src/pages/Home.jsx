import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const categories = [
    { name: "Electrician", icon: "⚡" },
    { name: "Plumber", icon: "🚰" },
    { name: "AC Repair", icon: "❄️" },
    { name: "Tutor", icon: "📚" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Mechanic", icon: "🚗" }
  ];

  

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}

      <div className="bg-white px-4 py-16 text-center shadow-sm sm:px-6 sm:py-20">

        <h1 className="mx-auto mb-4 max-w-4xl text-4xl font-bold text-gray-800 sm:text-5xl">
          Find Trusted Local Services
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:text-lg">
          Connect with electricians, plumbers, tutors and more near you.
        </p>

        <button
          onClick={() => navigate("/services")}
          className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore Services
        </button>

      </div>

      {/* SERVICE CATEGORIES */}

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">

        <h2 className="mb-10 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-xl bg-white p-5 text-center shadow hover:shadow-lg sm:p-8"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>

              <h3 className="font-semibold text-lg">
                {cat.name}
              </h3>

            </div>
          ))}

        </div>

      </div>

      {/* HOW IT WORKS */}

      <div className="bg-white px-4 py-16 sm:px-6 sm:py-20">

        <h2 className="mb-10 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">
          How LocalConnect Works
        </h2>

        <div className="mx-auto grid max-w-5xl gap-10 text-center md:grid-cols-3">

          <div>
            <div className="text-4xl mb-4">🔎</div>
            <h3 className="font-semibold mb-2">Search Service</h3>
            <p className="text-gray-600">
              Find trusted local professionals near you.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-semibold mb-2">Contact Provider</h3>
            <p className="text-gray-600">
              Connect directly with service providers.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-semibold mb-2">Get Work Done</h3>
            <p className="text-gray-600">
              Hire professionals and get your job done easily.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
