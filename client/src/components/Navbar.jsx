import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-20 bg-white shadow">

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">

        {/* LOGO */}

        <Link to="/" className="text-xl font-bold text-blue-600 sm:text-2xl">
          LocalConnect
        </Link>

        {/* MENU */}

        <div className="flex flex-wrap items-center justify-end gap-3 text-sm sm:gap-6 sm:text-base">

          <Link to="/services" className="hover:text-blue-600">
            Services
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <Link
                to="/add-service"
                className="rounded-lg bg-blue-600 px-3 py-2 text-white sm:px-4"
              >
                Add Service
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Provider Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-3 py-2 text-white sm:px-4"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
