import React, { useEffect, useMemo, useState } from "react";
import API, { getApiErrorMessage, isRequestCanceled } from "../services/api";
import ServiceCard from "../components/ServiceCard";

const normalizeLocation = (location) => String(location || "").trim().toLowerCase();

const parseCoordinates = (location) => {
  const match = String(location || "").match(/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/);

  if (!match) {
    return null;
  }

  return {
    lat: Number(match[1]),
    lng: Number(match[3])
  };
};

const getDistanceKm = (from, to) => {
  const earthRadiusKm = 6371;
  const toRadians = (value) => (value * Math.PI) / 180;
  const latDistance = toRadians(to.lat - from.lat);
  const lngDistance = toRadians(to.lng - from.lng);
  const a = (
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2)
  );
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

const Services = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(() => (
    localStorage.getItem("selectedLocation") || ""
  ));
  const [detectedCoordinates, setDetectedCoordinates] = useState(() => {
    const storedCoordinates = localStorage.getItem("detectedCoordinates");

    if (!storedCoordinates) {
      return null;
    }

    try {
      return JSON.parse(storedCoordinates);
    } catch {
      localStorage.removeItem("detectedCoordinates");
      return null;
    }
  });
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchServices = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await API.get("/services", { signal: controller.signal });
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

    fetchServices();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationMessage("Location detection is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        setDetectedCoordinates(coordinates);
        localStorage.setItem("detectedCoordinates", JSON.stringify(coordinates));
        setLocationMessage("Using your detected location where coordinates are available.");
      },
      () => {
        setLocationMessage("Choose a location manually to see nearby services first.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem("selectedLocation", selectedLocation);
    } else {
      localStorage.removeItem("selectedLocation");
    }
  }, [selectedLocation]);

  const locationOptions = useMemo(() => {
    return [...new Set(
      services
        .map((service) => service.location?.trim())
        .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
  }, [services]);

  const visibleServices = useMemo(() => {
    const selected = normalizeLocation(selectedLocation);

    return [...services].sort((a, b) => {
      if (selected) {
        const aMatches = normalizeLocation(a.location).includes(selected);
        const bMatches = normalizeLocation(b.location).includes(selected);

        if (aMatches !== bMatches) {
          return aMatches ? -1 : 1;
        }
      }

      if (detectedCoordinates && !selected) {
        const aCoordinates = parseCoordinates(a.location);
        const bCoordinates = parseCoordinates(b.location);

        if (aCoordinates && bCoordinates) {
          return (
            getDistanceKm(detectedCoordinates, aCoordinates) -
            getDistanceKm(detectedCoordinates, bCoordinates)
          );
        }

        if (aCoordinates !== bCoordinates) {
          return aCoordinates ? -1 : 1;
        }
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [detectedCoordinates, selectedLocation, services]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">

      <h1 className="mb-3 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
        Browse Services
      </h1>

      <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
        Find local providers and contact them directly by phone or WhatsApp.
      </p>

      <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-gray-900">Location</p>
            {locationMessage && (
              <p className="text-sm text-gray-500">{locationMessage}</p>
            )}
          </div>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
          >
            <option value="">All locations</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-80 animate-pulse rounded-xl bg-white shadow-sm" />
          ))}
        </div>
      ) : visibleServices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
          No services available yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Services;
