import React from "react";

export default function EditarAutoModal({ isOpen, onClose, auto, onChange, onSave }) {
  if (!isOpen || !auto) return null;

  const camposCompletos = auto.brand.trim() && auto.model.trim();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Auto</h2>

        <input
          type="text"
          name="brand"
          value={auto.brand}
          onChange={(e) => onChange({ ...auto, brand: e.target.value })}
          placeholder="Marca"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="model"
          value={auto.model}
          onChange={(e) => onChange({ ...auto, model: e.target.value })}
          placeholder="Modelo"
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={!camposCompletos}
            className={`px-4 py-2 rounded text-white transition ${
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