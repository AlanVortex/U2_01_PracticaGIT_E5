import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Proveedores from './pages/proveedores.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/proveedores" element={<Proveedores />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;