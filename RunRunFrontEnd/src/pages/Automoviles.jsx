import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import EditarAutoModal from "../components/EditarAutoModal";
import VerDetallesModal from "../components/VerDetallesModal";

export default function Autos() {
  const [cars, setCars] = useState([]);
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    color: "",
    plate: "",
    providerId: "",
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [autoToEdit, setAutoToEdit] = useState(null);
  const [autoToView, setAutoToView] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8092/api/proveedor")
      .then((res) => res.json())
      .then(setProviders)
      .catch(() => Swal.fire("Error", "No se pudo cargar proveedores", "error"));

    setCars([
      {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        color: "Rojo",
        plate: "ABC123",
        provider: { id: 1, name: "Proveedor A" },
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const { brand, model, color, plate, providerId } = form;
    if (!brand || !model || !color || !plate || !providerId) {
      return Swal.fire("Faltan datos", "Completa todos los campos", "warning");
    }

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas crear este auto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, crear",
    });

    if (confirm.isConfirmed) {
      const provider = providers.find((p) => p.id === Number(providerId));
      setCars([
        ...cars,
        {
          id: Date.now(),
          brand,
          model,
          color,
          plate,
          provider,
        },
      ]);
      setForm({ brand: "", model: "", color: "", plate: "", providerId: "" });
      Swal.fire("Creado", "Auto registrado con éxito", "success");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      setCars(cars.filter((c) => c.id !== id));
      Swal.fire("Eliminado", "Auto eliminado", "success");
    }
  };

  const openEditModal = async (car) => {
    setAutoToEdit({ ...car });
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setCars((prev) =>
      prev.map((c) => (c.id === autoToEdit.id ? autoToEdit : c))
    );
    setEditModalOpen(false);
    Swal.fire("Editado", "Auto actualizado con éxito", "success");
  };

  const openViewModal = (car) => {
    setAutoToView(car);
    setViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Gestión de Autos</h1>

        {/* Crear auto */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {["brand", "model", "color", "plate"].map((field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border rounded-lg px-3 py-2"
              />
            ))}
            <select
              name="providerId"
              value={form.providerId}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Proveedor</option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Crear
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800">Marca: {car.brand}</h3>
                <p>Modelo: {car.model}</p>
                <p>Color: {car.color}</p>
                <p>Placa: {car.plate}</p>
                <p className="text-gray-500 text-sm">Proveedor: {car.provider?.name}</p>
              </div>
              <div className="flex justify-end space-x-4 text-xl mt-4 text-blue-600">
                <button onClick={() => openEditModal(car)} title="Editar"><FaEdit /></button>
                <button onClick={() => handleDelete(car.id)} title="Eliminar"><FaTrash /></button>
                <button onClick={() => openViewModal(car)} title="Ver detalles"><FaEye /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditarAutoModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        auto={autoToEdit}
        onChange={setAutoToEdit}
        onSave={handleSaveEdit}
      />

      <VerDetallesModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        auto={autoToView}
      />
    </div>
  );
}