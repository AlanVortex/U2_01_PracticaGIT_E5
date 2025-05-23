import React from "react";

export default function EditarAutoModal({ isOpen, onClose, auto, onChange, onSave, proveedores }) {
  if (!isOpen || !auto) return null;

  const camposCompletos =
    auto.brand?.trim() &&
    auto.model?.trim() &&
    auto.color?.trim() &&
    auto.plate?.trim() &&
    auto.providerId;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Editar Automóvil</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="brand"
            value={auto.brand}
            onChange={(e) => onChange({ ...auto, brand: e.target.value })}
            placeholder="Marca"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="model"
            value={auto.model}
            onChange={(e) => onChange({ ...auto, model: e.target.value })}
            placeholder="Modelo"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="color"
            value={auto.color}
            onChange={(e) => onChange({ ...auto, color: e.target.value })}
            placeholder="Color"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="plate"
            value={auto.plate}
            onChange={(e) => onChange({ ...auto, plate: e.target.value })}
            placeholder="Placa"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            name="providerId"
            value={auto.providerId}
            onChange={(e) => onChange({ ...auto, providerId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name} {prov.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={!camposCompletos}
            className={`px-5 py-2 rounded-lg font-medium text-white transition ${
              camposCompletos
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
