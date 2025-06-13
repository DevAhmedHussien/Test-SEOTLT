import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">🗞 Новости сегодня</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/admin" className="hover:text-blue-200">Admin</Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-blue-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/admin" className="block hover:text-blue-200" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
