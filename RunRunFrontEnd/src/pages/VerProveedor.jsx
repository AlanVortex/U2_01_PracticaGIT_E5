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

  if (loading) return <div className="p-6">Cargando proveedor...</div>;
  if (!proveedor) return <div className="p-6">Proveedor no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Detalles del Proveedor</h2>
        <p><strong>Nombre:</strong> {proveedor.name}</p>
        <p><strong>Correo:</strong> {proveedor.email}</p>
        <p><strong>Teléfono:</strong> {proveedor.phone}</p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Sus Automóviles</h3>
        {proveedor.carEntityList?.length ? (
          <ul className="list-disc pl-5">
            {proveedor.carEntityList.map((car) => (
              <li key={car.id}>
                {car.brand} {car.model} - {car.plate}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Este proveedor no tiene automóviles registrados.</p>
        )}
      </div>
    </div>
  );
}

export default VerProveedor;
