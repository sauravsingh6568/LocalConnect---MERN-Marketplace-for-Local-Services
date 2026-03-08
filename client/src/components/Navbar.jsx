import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="text-2xl font-bold text-blue-600">
            LocalConnect
          </Link>

          <div className="space-x-6 hidden md:flex">

            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/add-service"
              className="text-gray-700 hover:text-blue-600"
            >
              Add Service
            </Link>

            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;