import React from "react";
import { Link } from "react-router-dom";
import { FaCarSide, FaTruck } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-12">Bienvenido a RunRun</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <Link
          to="/automoviles"
          className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-lg transition"
        >
          <FaCarSide className="text-5xl text-blue-600 mb-4" />
          <span className="text-xl font-semibold text-gray-700">Automóviles</span>
        </Link>
        <Link
          to="/proveedores"
          className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-lg transition"
        >
          <FaTruck className="text-5xl text-green-600 mb-4" />
          <span className="text-xl font-semibold text-gray-700">Proveedores</span>
        </Link>
      </div>
    </div>
  );
}