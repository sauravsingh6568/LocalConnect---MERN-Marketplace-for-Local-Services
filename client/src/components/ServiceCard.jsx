import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const whatsappMessage = encodeURIComponent("Hello I am interested in your service");
  const whatsappNumber = service.whatsappNumber?.replace(/\D/g, "");
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : "";
  const hasPrice = service.price !== undefined && service.price !== null;
  const provider = service.createdBy;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">

      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          className="h-44 w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col p-5">

        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {service.category && (
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                {service.category}
              </p>
            )}

            <h2 className="text-xl font-bold text-gray-900">
              {service.title}
            </h2>
          </div>

          <p className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            {hasPrice ? `₹${service.price}` : "Price on request"}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {service.description}
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
          <span className="text-blue-600">📍</span>
          {service.location}
        </p>

        {provider && (
          <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
            {provider.profileImage ? (
              <img
                src={provider.profileImage}
                alt={provider.name}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                {provider.name?.charAt(0) || "P"}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
              {provider.mobileNumber && (
                <p className="text-xs text-gray-500">{provider.mobileNumber}</p>
              )}
            </div>
          </div>
        )}

        {(service.phoneNumber || whatsappLink) && (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.phoneNumber && (
              <a
                href={`tel:${service.phoneNumber}`}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Call
              </a>
            )}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-700"
              >
                WhatsApp
              </a>
            )}
          </div>
        )}

        <Link
          to={`/services/${service._id}`}
          className="mt-3 rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
        >
          View Details
        </Link>

      </div>

    </article>
  );
};

export default ServiceCard;
