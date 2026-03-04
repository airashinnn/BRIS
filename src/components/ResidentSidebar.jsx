import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  Newspaper, 
  FileText, 
  Bell,
  User,
  LogOut,
  ChevronRight,
  MapPin
} from "lucide-react";

const ResidentSidebar = ({ residentName = "Juan dela Cruz" }) => {
  const navigate = useNavigate();

  const residentLinks = [
    { name: "Home", path: "/resident/", icon: <Home size={20} /> },
    { name: "News", path: "/resident/news", icon: <Newspaper size={20} /> },
    { name: "Services", path: "/resident/services", icon: <FileText size={20} /> },
    { name: "Requests", path: "/resident/requests", icon: <Bell size={20} /> },
    { name: "Profile", path: "/resident/profile", icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto shadow-lg">
      {/* Logo */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xl shadow-md">
            BP
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">Brgy. Pantal</h2>
            <p className="text-xs text-emerald-100">Dagupan City</p>
          </div>
        </div>
      </div>

      {/* Resident Info */}
      <div className="mx-4 mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <p className="text-xs text-emerald-600 font-medium mb-1 flex items-center gap-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Resident Portal
        </p>
        <p className="font-semibold text-gray-800 text-lg">{residentName}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <MapPin size={12} className="text-emerald-500" />
          Block 1, Lot 5, Pantal
        </p>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MENU</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {residentLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 group-hover:text-emerald-600 transition-colors">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
        <p className="text-xs text-center text-gray-400 mt-3">
          v2.0 • Resident Access
        </p>
      </div>
    </div>
  );
};

export default ResidentSidebar;