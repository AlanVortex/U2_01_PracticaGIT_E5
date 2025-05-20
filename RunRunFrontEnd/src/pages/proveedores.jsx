    import React from "react";

const proveedores = [
  { id: 1, nombre: "Proveedor Uno", correo: "uno@email.com", telefono: "555-1234" },
  { id: 2, nombre: "Proveedor Dos", correo: "dos@email.com", telefono: "555-5678" },
  { id: 3, nombre: "Proveedor Tres", correo: "tres@email.com", telefono: "555-9012" },
];

function Proveedores() {
  return (
    <div className="min-h-screen bg-white text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Proveedores</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition">
            Nuevo
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-xl bg-blue-900">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-left text-sm uppercase text-zinc-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Correo</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov) => (
                <tr key={prov.id} className="border-t border-blue-800 hover:bg-blue-800 transition">
                  <td className="px-6 py-4">{prov.nombre}</td>
                  <td className="px-6 py-4">{prov.correo}</td>
                  <td className="px-6 py-4">{prov.telefono}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1 px-4 rounded mr-2 transition">
                      Editar
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-4 rounded transition">
                      Borrar
                    </button>
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
