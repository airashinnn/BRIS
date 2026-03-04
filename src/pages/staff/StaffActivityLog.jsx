import { useState } from "react";
import { 
  History,
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle,
  PlayCircle,
  Megaphone,
  Users,
  Home
} from "lucide-react";

const StaffActivityLog = () => {
  const [filter, setFilter] = useState("all");

  const activities = [
    {
      id: 1,
      action: "Completed Request",
      description: "Barangay Clearance for Juan dela Cruz",
      staff: "Maria Santos",
      timestamp: "2026-01-12 10:30 AM",
      type: "request",
      icon: <CheckCircle size={16} className="text-green-600" />
    },
    {
      id: 2,
      action: "Processing Request",
      description: "Certificate of Residency for Ana Reyes",
      staff: "Carlos Mendoza",
      timestamp: "2026-01-16 2:15 PM",
      type: "request",
      icon: <PlayCircle size={16} className="text-blue-600" />
    },
    {
      id: 3,
      action: "Added Announcement",
      description: "Posted 'Barangay Assembly Meeting'",
      staff: "Maria Santos",
      timestamp: "2026-01-15 9:00 AM",
      type: "announcement",
      icon: <Megaphone size={16} className="text-purple-600" />
    },
    {
      id: 4,
      action: "Updated Resident",
      description: "Updated contact info for Pedro Santos",
      staff: "Linda Reyes",
      timestamp: "2026-01-14 3:45 PM",
      type: "resident",
      icon: <Users size={16} className="text-orange-600" />
    },
    {
      id: 5,
      action: "Added New Resident",
      description: "Registered new resident Ana Reyes",
      staff: "Carlos Mendoza",
      timestamp: "2026-01-13 11:20 AM",
      type: "resident",
      icon: <Users size={16} className="text-green-600" />
    },
    {
      id: 6,
      action: "Updated Household",
      description: "Updated household records for Garcia Family",
      staff: "Maria Santos",
      timestamp: "2026-01-12 4:30 PM",
      type: "household",
      icon: <Home size={16} className="text-emerald-600" />
    }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <History size={28} className="text-emerald-600" />
          Activity Log
        </h1>
        <p className="text-gray-600">Track all staff actions and system activities</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        
        <select 
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Activities</option>
          <option value="request">Requests</option>
          <option value="resident">Residents</option>
          <option value="household">Households</option>
          <option value="announcement">Announcements</option>
        </select>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Calendar size={18} />
          <span>Date Range</span>
        </button>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Activities</p>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-2xl font-bold text-emerald-600">12</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-2xl font-bold text-blue-600">45</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-purple-600">128</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{activity.action}</h3>
                    <span className="text-xs text-gray-400">{activity.timestamp}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={14} />
                    <span>{activity.staff}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default StaffActivityLog;