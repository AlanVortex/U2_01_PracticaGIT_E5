import React from "react";

export default function VerDetallesModal({ isOpen, onClose, auto }) {
  if (!isOpen || !auto) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Detalles del Auto
        </h2>
        <p>
          <strong>Marca:</strong> {auto.brand}
        </p>
        <p>
          <strong>Modelo:</strong> {auto.model}
        </p>
        <p>
          <strong>Color:</strong> {auto.color}
        </p>
        <p>
          <strong>Placa:</strong> {auto.plate}
        </p>
        <p>
          <strong>Proveedor:</strong> {auto.provider?.name || "N/A"}
        </p>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
