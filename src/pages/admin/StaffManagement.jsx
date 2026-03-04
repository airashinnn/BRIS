import { useState } from "react";
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  Briefcase,
  Edit,
  Trash2,
  Plus,
  Search,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("all");

  const staffMembers = [
    {
      id: 1,
      name: "Maria Santos",
      position: "Secretary",
      email: "maria.santos@pantal.gov.ph",
      phone: "09171234501",
      hired: "2022-03-15",
      status: "Active",
      tasks: ["Document Processing", "Records Management"],
      activities: 12
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      position: "Assistant",
      email: "carlos.mendoza@pantal.gov.ph",
      phone: "09181234502",
      hired: "2023-06-20",
      status: "Active",
      tasks: ["Request Processing", "Resident Assistance"],
      activities: 8
    },
    {
      id: 3,
      name: "Ana Rodriguez",
      position: "Clerk",
      email: "ana.rodriguez@pantal.gov.ph",
      phone: "09191234503",
      hired: "2024-01-10",
      status: "Active",
      tasks: ["Filing", "Data Entry"],
      activities: 5
    },
    {
      id: 4,
      name: "John Santos",
      position: "Clerk",
      email: "john.santos@pantal.gov.ph",
      phone: "09201234504",
      hired: "2023-11-05",
      status: "Inactive",
      tasks: ["Document Processing"],
      activities: 3
    }
  ];

  const recentActivities = [
    { staff: "Maria Santos", action: "processed Barangay Clearance for Juan dela Cruz", time: "10 mins ago" },
    { staff: "Carlos Mendoza", action: "approved Certificate of Residency", time: "25 mins ago" },
    { staff: "Ana Rodriguez", action: "updated household records", time: "1 hour ago" },
    { staff: "Maria Santos", action: "rejected Business Permit application", time: "2 hours ago" }
  ];

  const stats = {
    total: staffMembers.length,
    active: staffMembers.filter(s => s.status === "Active").length,
    inactive: staffMembers.filter(s => s.status === "Inactive").length,
    activities: 28
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Staff Management</h1>
          <p className="text-gray-600">Manage barangay staff and their access</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
          <UserPlus size={18} />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Total Staff</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-50 rounded-lg">
              <XCircle className="text-gray-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Inactive</span>
          </div>
          <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="text-purple-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Activities Today</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.activities}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search staff by name, position, or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xl">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
                    <p className="text-emerald-600 font-medium">{staff.position}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  staff.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {staff.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Hired: {staff.hired}</span>
                </div>
              </div>

              {/* Tasks */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Assigned Tasks:</p>
                <div className="flex flex-wrap gap-1">
                  {staff.tasks.map((task, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {task}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Edit size={18} />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-emerald-600" />
          Recent Staff Activities
        </h2>
        
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">
                {activity.staff.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">{activity.staff}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;