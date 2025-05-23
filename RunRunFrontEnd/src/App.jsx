import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Autos from './pages/Automoviles.jsx';
import Proveedores from './pages/Proveedores.jsx';
import VerProveedor from './pages/VerProveedor.jsx';
import VerAuto from './pages/VerAutomovil.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proveedores/:id" element={<VerProveedor />} />
            <Route path="/automoviles" element={<Autos />} />
            <Route path="/automoviles/:id" element={<VerAuto />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
