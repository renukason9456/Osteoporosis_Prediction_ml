import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition ${
      location.pathname === path
        ? "bg-purple-700 text-white"
        : "text-gray-700 hover:bg-purple-100"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold text-purple-700">
            BoneGuard
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}

          {user && (
            <div className="relative group">
              {/* Avatar */}
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center cursor-pointer">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Hover dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white w-72 h-full p-6"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-purple-700">BoneGuard</span>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <div className="mt-4 border-t pt-4">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
