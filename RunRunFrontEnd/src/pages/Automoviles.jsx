import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import EditarAutoModal from "../components/EditarAutoModal";
import { Link } from "react-router-dom";

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

    fetch("http://localhost:8092/api/automoviles")
      .then((res) => res.json())
      .then(setCars)
      .catch(() => Swal.fire("Error", "No se pudo cargar autos", "error"));
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

    if (!confirm.isConfirmed) return;

    const dto = {
      brand,
      model,
      color,
      plate,
      idProveedor: Number(providerId),
    };

    fetch("http://localhost:8092/api/automoviles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
      .then((res) => res.json())
      .then((data) => {
        setCars([...cars, data]);
        setForm({ brand: "", model: "", color: "", plate: "", providerId: "" });
        Swal.fire("Creado", "Auto registrado con éxito", "success");
      })
      .catch(() => Swal.fire("Error", "No se pudo crear el auto", "error"));
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (!confirm.isConfirmed) return;

    fetch(`http://localhost:8092/api/automoviles/${id}`, { method: "DELETE" })
      .then(() => {
        setCars(cars.filter((c) => c.id !== id));
        Swal.fire("Eliminado", "Auto eliminado", "success");
      })
      .catch(() => Swal.fire("Error", "No se pudo eliminar el auto", "error"));
  };

  const openEditModal = (car) => {
    setAutoToEdit({ ...car });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const confirm = await Swal.fire({
      title: "¿Guardar cambios?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
    });

    if (!confirm.isConfirmed) return;

    const dto = {
      id: autoToEdit.id, // ✅ Este es esencial para que funcione el PUT
      brand: autoToEdit.brand,
      model: autoToEdit.model,
      color: autoToEdit.color,
      plate: autoToEdit.plate,
      idProveedor: Number(autoToEdit.providerId),
    };

    fetch("http://localhost:8092/api/automoviles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
      .then((res) => res.json())
      .then((updatedCar) => {
        setCars((prev) =>
          prev.map((c) => (c.id === updatedCar.id ? updatedCar : c))
        );
        setEditModalOpen(false);
        Swal.fire("Editado", "Auto actualizado con éxito", "success");
      })
      .catch(() => Swal.fire("Error", "No se pudo actualizar el auto", "error"));
  };


  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Automóviles</h2>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition"
          >
            Crear
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          {["Marca", "Modelo", "Color", "Placa"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleInputChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="p-2 border border-gray-300 shadow-sm focus:ring-2 rounded focus:ring-blue-500 focus:outline-none"
            />
          ))}
          <select
            name="providerId"
            value={form.providerId}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 shadow-sm focus:ring-2 rounded focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Proveedor</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800">Marca: {car.brand}</h3>
                <p>Modelo: {car.model}</p>
                <p>Color: {car.color}</p>
                <p>Placa: {car.plate}</p>
                <p className="text-gray-500 text-sm">
                  Proveedor: {car.proveedor?.name}
                </p>
              </div>
              <div className="flex justify-end space-x-4 text-xl mt-4 text-blue-600">
                <button onClick={() => openEditModal(car)} title="Editar">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(car.id)} title="Eliminar">
                  <FaTrash />
                </button>
                <Link to={`/automoviles/${car.id}`} title="Ver detalles">
                  <FaEye />
                </Link>

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
        proveedores={providers}
      />

    </div>
  );
}
