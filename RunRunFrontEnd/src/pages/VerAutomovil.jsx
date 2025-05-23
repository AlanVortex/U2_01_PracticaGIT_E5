import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VerAuto() {
  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8092/api/automoviles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAuto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar auto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6 text-gray-700">Cargando auto...</div>;
  if (!auto) return <div className="p-6 text-red-600">Auto no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-start justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Card Auto */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Información del Auto</h2>
          <p><strong>Marca:</strong> {auto.brand}</p>
          <p><strong>Modelo:</strong> {auto.model}</p>
          <p><strong>Color:</strong> {auto.color}</p>
          <p><strong>Placa:</strong> {auto.plate.replace(/(\w{3})(\d{3})(\w)/, "$1-$2-$3")}</p>
        </div>

        {/* Card Proveedor */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Proveedor Asociado</h2>
          <p><strong>Nombre:</strong> {auto.proveedor?.name}</p>
          <p><strong>Apellido:</strong> {auto.proveedor?.lastname}</p>
          <p><strong>Correo:</strong> {auto.proveedor?.email}</p>
          <p><strong>Teléfono:</strong> {auto.proveedor?.phone}</p>
        </div>
      </div>
    </div>
  );
}
