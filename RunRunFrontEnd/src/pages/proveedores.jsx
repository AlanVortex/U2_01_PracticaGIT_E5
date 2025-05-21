import React, { useEffect, useState } from "react";
import EditarProveedorModal from "../components/EditarProveedorModal";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    name: "",
    email: "",
    telephone: ""
  });

  const getProveedores = () => {
    fetch("http://localhost:8080/api/proveedores")
      .then((res) => res.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error("Error al cargar proveedores:", error));
  };

  useEffect(() => {
    getProveedores();
  }, []);

  const handleChange = (e) => {
    setNuevoProveedor({ ...nuevoProveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, telephone } = nuevoProveedor;

    if (!name.trim() || !email.trim() || !telephone.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    fetch("http://localhost:8080/api/proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProveedor),
    })
      .then((res) => {
        if (res.ok) {
          setNuevoProveedor({ name: "", email: "", telephone: "" });
          getProveedores();
        }
      })
      .catch((err) => console.error("Error al crear proveedor:", err));
  };


  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este proveedor?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8080/api/proveedores/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProveedores(proveedores.filter((p) => p.id !== id));
      } else {
        console.error("Error al eliminar proveedor");
      }
    } catch (err) {
      console.error("Error en la solicitud DELETE:", err);
    }
  };

  const [modalAbierto, setModalAbierto] = useState(false);
  const [proveedorActual, setProveedorActual] = useState({ id: null, name: "", email: "", telephone: "" });

  const abrirModalEdicion = (proveedor) => {
    setProveedorActual(proveedor);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProveedorActual({ id: null, name: "", email: "", telephone: "" });
  };

  const handleEditChange = (e) => {
    setProveedorActual({ ...proveedorActual, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    fetch(`http://localhost:8080/api/proveedores/${proveedorActual.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proveedorActual),
    })
      .then((res) => {
        if (res.ok) {
          getProveedores();
          cerrarModal();
        }
      })
      .catch((err) => console.error("Error al editar proveedor:", err));
  };



  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Proveedores</h2>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition"
          >
            Crear
          </button>
        </div>

        {/* Formulario */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={nuevoProveedor.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={nuevoProveedor.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Teléfono"
            value={nuevoProveedor.telephone}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        {/* Tabla */}
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
                  <td className="px-4 py-2 border-b">{prov.name}</td>
                  <td className="px-4 py-2 border-b">{prov.email}</td>
                  <td className="px-4 py-2 border-b">{prov.telephone}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => abrirModalEdicion(prov)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-4 rounded mr-2 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(prov.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition"
                    >
                      Borrar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditarProveedorModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        proveedor={proveedorActual}
        onChange={handleEditChange}
        onSave={guardarCambios}
      />

    </div>
  );
}

export default Proveedores;
