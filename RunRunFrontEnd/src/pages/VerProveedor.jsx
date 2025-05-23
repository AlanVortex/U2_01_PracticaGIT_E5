import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerProveedor() {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8092/api/proveedor/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProveedor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar proveedor:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6 text-gray-700">Cargando proveedor...</div>;
  if (!proveedor) return <div className="p-6 text-red-600">Proveedor no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-start justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Card proveedor */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Proveedor Asociado</h2>
          <p><strong>Nombre:</strong> {proveedor.name}</p>
          <p><strong>Apellido:</strong> {proveedor.lastname}</p>
          <p><strong>Correo:</strong> {proveedor.email}</p>
          <p><strong>Teléfono:</strong> {proveedor.phone}</p>
        </div>

        {/* Card de autos */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Autos Registrados</h2>
          {proveedor.cars?.length ? (
            <ul className="space-y-3">
              {proveedor.cars.map((car) => (
                <li
                  key={car.id}
                  className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-800">{car.brand}</span>{" "}
                  — <span className="text-gray-700">{car.model}</span>{" "}
                  ({car.plate.replace(/(\w{3})(\d{3})(\w)/, "$1-$2-$3")})
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-gray-500">Este proveedor no tiene automóviles registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerProveedor;
