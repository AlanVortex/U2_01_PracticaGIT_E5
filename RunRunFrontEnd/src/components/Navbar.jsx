import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">RunRun</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/automoviles"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Automóviles
            </Link>
            <Link
              to="/proveedores"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Proveedores
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;