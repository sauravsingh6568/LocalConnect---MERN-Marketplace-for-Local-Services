import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API, { getApiErrorMessage, isRequestCanceled } from "../services/api";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchService = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await API.get(`/services/${id}`, { signal: controller.signal });
        setService(res.data);
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setError(getApiErrorMessage(err, "Unable to load service details"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchService();

    return () => controller.abort();
  }, [id]);

  const whatsappMessage = encodeURIComponent("Hello I am interested in your service");
  const whatsappNumber = service?.whatsappNumber?.replace(/\D/g, "");
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : "";
  const provider = service?.createdBy;

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="h-96 animate-pulse rounded-xl bg-white shadow-sm" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Service not found"}
        </div>
        <Link to="/services" className="mt-6 inline-block font-semibold text-blue-600">
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link to="/services" className="mb-6 inline-block text-sm font-semibold text-blue-600">
        Back to services
      </Link>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {service.image && (
          <img
            src={service.image}
            alt={service.title}
            className="h-72 w-full object-cover"
          />
        )}

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              {service.category}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {service.title}
            </h1>

            <p className="mt-3 text-lg font-semibold text-gray-900">
              {service.price !== undefined && service.price !== null
                ? `₹${service.price}`
                : "Price on request"}
            </p>

            <p className="mt-4 text-gray-700">
              {service.location}
            </p>

            <p className="mt-6 whitespace-pre-line leading-7 text-gray-700">
              {service.description}
            </p>
          </div>

          <aside className="rounded-xl border border-gray-200 p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Provider Details
            </h2>

            {provider && (
              <div className="mb-5 flex items-center gap-3">
                {provider.profileImage ? (
                  <img
                    src={provider.profileImage}
                    alt={provider.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700">
                    {provider.name?.charAt(0) || "P"}
                  </div>
                )}

                <div>
                  <p className="font-semibold text-gray-900">{provider.name}</p>
                  {provider.location && (
                    <p className="text-sm text-gray-500">{provider.location}</p>
                  )}
                  {provider.mobileNumber && (
                    <p className="text-sm text-gray-500">{provider.mobileNumber}</p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {service.phoneNumber && (
                <a
                  href={`tel:${service.phoneNumber}`}
                  className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
                >
                  Call Provider
                </a>
              )}

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
