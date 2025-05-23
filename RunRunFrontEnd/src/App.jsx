import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Autos from './pages/autos.jsx';
import Proveedores from './pages/proveedores.jsx';
import VerProveedor from './pages/VerProveedor.jsx'; // correcto

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proveedores/:id" element={<VerProveedor />} /> {/* sin comillas */}
            <Route path="/automoviles" element={<Autos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
