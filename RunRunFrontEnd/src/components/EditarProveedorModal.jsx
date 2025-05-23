import React from "react";

function EditarProveedorModal({ isOpen, onClose, proveedor, onChange, onSave }) {
  if (!isOpen) return null;

  // Regex
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{7,15}$/;

  const camposValidos =
    nameRegex.test(proveedor.name?.trim() || "") &&
    nameRegex.test(proveedor.lastname?.trim() || "") &&
    emailRegex.test(proveedor.email?.trim() || "") &&
    phoneRegex.test(proveedor.phone?.trim() || "");

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Editar Proveedor
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={proveedor.name}
            onChange={onChange}
            placeholder="Nombre"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="lastname"
            value={proveedor.lastname}
            onChange={onChange}
            placeholder="Apellido"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={proveedor.email}
            onChange={onChange}
            placeholder="Correo"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            value={proveedor.phone}
            onChange={onChange}
            placeholder="Teléfono"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
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
            disabled={!camposValidos}
            className={`px-5 py-2 rounded-lg font-medium text-white transition ${
              camposValidos
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
