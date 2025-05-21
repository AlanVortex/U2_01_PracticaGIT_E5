import React from "react";

function EditarProveedorModal({ isOpen, onClose, proveedor, onChange, onSave }) {
  if (!isOpen) return null;

  const camposCompletos = proveedor.name.trim() && proveedor.email.trim() && proveedor.telephone.trim();

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Proveedor</h2>

        <input
          type="text"
          name="name"
          value={proveedor.name}
          onChange={onChange}
          placeholder="Nombre"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={proveedor.email}
          onChange={onChange}
          placeholder="Correo"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="telephone"
          value={proveedor.telephone}
          onChange={onChange}
          placeholder="Teléfono"
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

export default EditarProveedorModal;
