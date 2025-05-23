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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Detalles del Proveedor</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="font-semibold text-lg">{proveedor.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Apellido</p>
            <p className="font-semibold text-lg">{proveedor.lastname}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Correo</p>
            <p className="font-medium">{proveedor.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="font-medium">{proveedor.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Automóviles Registrados</h3>
          {proveedor.carEntityList?.length ? (
            <ul className="space-y-2">
              {proveedor.carEntityList.map((car) => (
                <li
                  key={car.id}
                  className="bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-700">{car.brand}</span> –{" "}
                  <span className="font-semibold">{car.model}</span> ({car.plate})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Este proveedor no tiene automóviles registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerProveedor;
