import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API, { getApiErrorMessage, isRequestCanceled } from "../services/api";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { isAuthenticated, provider } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMyServices = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await API.get("/services/user", { signal: controller.signal });
        setServices(res.data);
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setError(getApiErrorMessage(err, "Unable to load services"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchMyServices();
    }

    return () => controller.abort();
  }, [isAuthenticated]);

  const handleDelete = async (serviceId) => {
    const confirmed = window.confirm("Delete this service?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(serviceId);
      await API.delete(`/services/${serviceId}`);
      setServices((currentServices) => (
        currentServices.filter((service) => service._id !== serviceId)
      ));
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to delete service"));
    } finally {
      setDeletingId("");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">

      <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
        Provider Dashboard
      </h1>

      <p className="mb-6 text-gray-600">
        Welcome, {provider?.name}
      </p>

      <div className="rounded-xl bg-white p-4 shadow sm:p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl font-semibold">
            My Services
          </h2>

          <Link
            to="/add-service"
            className="inline-flex justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add Service
          </Link>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-32 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600">
            Services you post will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-blue-600 text-sm font-medium">{service.category}</p>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <p className="mt-2 text-gray-500">{service.location}</p>
                  {service.phoneNumber && (
                    <p className="text-gray-500">Phone: {service.phoneNumber}</p>
                  )}
                  {service.whatsappNumber && (
                    <p className="text-gray-500">WhatsApp: {service.whatsappNumber}</p>
                  )}
                  {service.price !== undefined && service.price !== null && (
                    <p className="font-semibold mt-2">₹{service.price}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(service._id)}
                  disabled={deletingId === service._id}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  {deletingId === service._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
