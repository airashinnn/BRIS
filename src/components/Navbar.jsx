import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-bold text-lg">Brgy. Pantal</span>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
            <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
            <Link to="/requests" className="hover:bg-blue-700 px-3 py-2 rounded">Requests</Link>
            <Link to="/services" className="hover:bg-blue-700 px-3 py-2 rounded">Services</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;