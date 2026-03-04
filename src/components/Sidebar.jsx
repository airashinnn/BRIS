import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Megaphone, 
  ClipboardList, 
  FileText,
  Settings,
  LogOut
} from "lucide-react";

const Sidebar = ({ role }) => {
  const adminLinks = [
    { name: "Dashboard", path: "/admin/", icon: <LayoutDashboard size={20} /> },
    { name: "Residents", path: "/admin/residents", icon: <Users size={20} /> },
    { name: "Households", path: "/admin/households", icon: <Home size={20} /> },
    { name: "Announcements", path: "/admin/announcements", icon: <Megaphone size={20} /> },
    { name: "Services", path: "/admin/services", icon: <ClipboardList size={20} /> },
    { name: "Requests", path: "/admin/requests", icon: <FileText size={20} /> },
    { name: "Staff Management", path: "/admin/staff", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            BP
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Brgy. Pantal</h2>
            <p className="text-xs text-gray-500">Dagupan City</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {adminLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200"
              >
                <span className="text-gray-400">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold">A</span>
          </div>
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-gray-500">OFFICIAL ACCESS</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;