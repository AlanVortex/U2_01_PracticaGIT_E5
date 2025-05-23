import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import EditarProveedorModal from "../components/EditarProveedorModal";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: ""
  });

  const getProveedores = () => {
    fetch("http://localhost:8092/api/proveedor")
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
    const { name, lastname, email, phone } = nuevoProveedor;

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{10}$/;

    if (!name.trim() || !lastname.trim() || !email.trim() || !phone.trim()) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    if (!nombreRegex.test(name) || !nombreRegex.test(lastname)) {
      Swal.fire("Error", "Nombre y apellido solo deben contener letras.", "error");
      return;
    }

    if (!correoRegex.test(email)) {
      Swal.fire("Error", "Correo electrónico no válido.", "error");
      return;
    }

    if (!telefonoRegex.test(phone)) {
      Swal.fire("Error", "El teléfono debe contener exactamente 10 dígitos.", "error");
      return;
    }

    const duplicado = proveedores.some(
      (p) =>
        p.name === name &&
        p.lastname === lastname &&
        p.email === email
    );

    if (duplicado) {
      Swal.fire("Error", "Ya existe un proveedor con ese nombre, apellido y correo.", "error");
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a crear este proveedor.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8092/api/proveedor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoProveedor),
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire("¡Creado!", "Proveedor creado correctamente.", "success");
              setNuevoProveedor({ name: "", lastname: "", email: "", phone: "" });
              getProveedores();
            } else {
              Swal.fire("Error", "No se pudo crear el proveedor.", "error");
            }
          })
          .catch(() => Swal.fire("Error", "Error al conectar con el servidor.", "error"));
      }
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8092/api/proveedor/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("¡Eliminado!", "Proveedor eliminado correctamente.", "success");
          setProveedores(proveedores.filter((p) => p.id !== id));
        } else {
          Swal.fire("Error", "No se pudo eliminar el proveedor.", "error");
        }
      } catch {
        Swal.fire("Error", "Error al conectar con el servidor.", "error");
      }
    }
  };

  const [modalAbierto, setModalAbierto] = useState(false);
  const [proveedorActual, setProveedorActual] = useState({ id: null, name: "", lastname: "", email: "", phone: "" });

  const abrirModalEdicion = (proveedor) => {
    setProveedorActual(proveedor);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProveedorActual({ id: null, name: "", lastname: "", email: "", phone: "" });
  };

  const handleEditChange = (e) => {
    setProveedorActual({ ...proveedorActual, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a guardar los cambios.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8092/api/proveedor", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proveedorActual),
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire("¡Guardado!", "Proveedor actualizado correctamente.", "success");
              getProveedores();
              cerrarModal();
            } else {
              Swal.fire("Error", "No se pudo actualizar el proveedor.", "error");
            }
          })
          .catch(() => Swal.fire("Error", "Error al conectar con el servidor.", "error"));
      }
    });
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
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={nuevoProveedor.name}
            onChange={handleChange}
            className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={nuevoProveedor.lastname}
            onChange={handleChange}
            className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={nuevoProveedor.email}
            onChange={handleChange}
            className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={nuevoProveedor.phone}
            onChange={handleChange}
            className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="text-left px-6 py-3 rounded-l-lg">Nombre</th>
                <th className="text-left px-6 py-3">Apellido</th>
                <th className="text-left px-6 py-3">Correo</th>
                <th className="text-left px-6 py-3">Teléfono</th>
                <th className="text-center px-6 py-3 rounded-r-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov) => (
                <tr key={prov.id} className="bg-white shadow rounded-lg">
                  <td className="px-6 py-4 font-semibold">{prov.name}</td>
                  <td className="px-6 py-4">{prov.lastname}</td>
                  <td className="px-6 py-4">{prov.email}</td>
                  <td className="px-6 py-4">{prov.phone}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link
                      to={`/proveedores/${prov.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded shadow transition"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => abrirModalEdicion(prov)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded shadow transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(prov.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow transition"
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