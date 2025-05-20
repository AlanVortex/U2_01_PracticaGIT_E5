import React from "react";

const proveedores = [
  { id: 1, nombre: "Proveedor Uno", correo: "uno@email.com", telefono: "555-1234" },
  { id: 2, nombre: "Proveedor Dos", correo: "dos@email.com", telefono: "555-5678" },
  { id: 3, nombre: "Proveedor Tres", correo: "tres@email.com", telefono: "555-9012" },
];

function Proveedores() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Proveedores</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition">Nuevo</button>
        </div>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 font-normal">Nombre</th>
                <th className="px-4 py-3 text-left text-gray-600 font-normal">Correo</th>
                <th className="px-4 py-3 text-left text-gray-600 font-normal">Teléfono</th>
                <th className="px-4 py-3 text-center text-gray-600 font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov) => (
                <tr key={prov.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b">{prov.nombre}</td>
                  <td className="px-4 py-2 border-b">{prov.correo}</td>
                  <td className="px-4 py-2 border-b">{prov.telefono}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-4 rounded mr-2 transition">Editar</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition">Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Proveedores;