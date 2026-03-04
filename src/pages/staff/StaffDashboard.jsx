import { useState } from "react";
import { 
  Clock, 
  CheckCircle, 
  Users, 
  Home,
  FileText,
  Bell,
  PlayCircle,
  Eye,
  ClipboardList,
  History,
  Calendar,
  User
} from "lucide-react";

const StaffDashboard = () => {
  const [staffName] = useState("Maria Santos");

  const stats = [
    { title: "Pending Requests", value: "2", icon: <Clock size={28} />, color: "yellow", bgColor: "bg-yellow-50" },
    { title: "Processing", value: "1", icon: <PlayCircle size={28} />, color: "blue", bgColor: "bg-blue-50" },
    { title: "Completed Today", value: "1", icon: <CheckCircle size={28} />, color: "green", bgColor: "bg-green-50" },
    { title: "Total Residents", value: "6", icon: <Users size={28} />, color: "purple", bgColor: "bg-purple-50" },
  ];

  const myTasks = [
    { 
      type: "Certificate of Residency", 
      name: "Ana Reyes", 
      date: "2026-01-15", 
      status: "pending",
      purpose: "Bank Requirement"
    },
    { 
      type: "Business Permit", 
      name: "Roberto Garcia", 
      date: "2026-01-16", 
      status: "pending",
      purpose: "New Business"
    },
    { 
      type: "Barangay Indigency", 
      name: "Maria dela Cruz", 
      date: "2026-01-17", 
      status: "pending",
      purpose: "Medical Assistance"
    },
  ];

  const recentActivities = [
    { 
      action: "Completed Request", 
      description: "Barangay Clearance for Juan dela Cruz",
      staff: "Maria Santos", 
      time: "2026-01-12 10:30 AM",
      icon: "✅",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      action: "Processing Request", 
      description: "Certificate of Residency for Ana Reyes",
      staff: "Carlos Mendoza", 
      time: "2026-01-16 2:15 PM",
      icon: "🔄",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      action: "Added Announcement", 
      description: "Posted 'Barangay Assembly Meeting'",
      staff: "Maria Santos", 
      time: "2026-01-15 9:00 AM",
      icon: "📢",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    { 
      action: "Updated Resident", 
      description: "Updated contact info for Pedro Santos",
      staff: "Linda Reyes", 
      time: "2026-01-14 3:45 PM",
      icon: "✏️",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    { 
      action: "Added New Resident", 
      description: "Registered new resident Ana Reyes",
      staff: "Carlos Mendoza", 
      time: "2026-01-13 11:20 AM",
      icon: "👤",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
  ];

  const quickActions = [
    { name: "Process Request", icon: <PlayCircle size={20} />, color: "text-blue-600", bgColor: "bg-blue-50", hoverColor: "hover:bg-blue-100" },
    { name: "View Residents", icon: <Eye size={20} />, color: "text-green-600", bgColor: "bg-green-50", hoverColor: "hover:bg-green-100" },
    { name: "Add Announcement", icon: <Bell size={20} />, color: "text-purple-600", bgColor: "bg-purple-50", hoverColor: "hover:bg-purple-100" },
    { name: "View Reports", icon: <FileText size={20} />, color: "text-orange-600", bgColor: "bg-orange-50", hoverColor: "hover:bg-orange-100" },
  ];

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Welcome Header with Date */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <User size={16} className="text-emerald-600" />
            Welcome back, <span className="font-semibold text-emerald-600">{staffName}</span>!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <Calendar size={18} className="text-emerald-600" />
          <span className="text-gray-600">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-105 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className={`p-4 ${stat.bgColor} rounded-xl`}>
                <div className={`text-${stat.color}-600`}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Tasks Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <ClipboardList size={24} className="text-emerald-600" />
            My Tasks
          </h2>
          <span className="text-sm text-emerald-600 font-medium cursor-pointer hover:text-emerald-700">
            View All →
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {myTasks.map((task, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all hover:border-emerald-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800 text-lg">{task.type}</h3>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full font-medium">
                  {task.status}
                </span>
              </div>
              <p className="text-gray-800 font-medium mb-1">{task.name}</p>
              <p className="text-sm text-gray-500 mb-3">{task.purpose}</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar size={14} />
                  {task.date}
                </span>
                <button className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-100 font-medium transition">
                  Process
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              className={`bg-white border border-gray-200 rounded-xl p-5 ${action.hoverColor} transition-all hover:shadow-md hover:scale-105 flex flex-col items-center gap-3`}
            >
              <div className={`p-3 ${action.bgColor} rounded-xl`}>
                <span className={action.color}>{action.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <History size={24} className="text-emerald-600" />
            Recent Activity
          </h2>
          <span className="text-sm text-emerald-600 font-medium cursor-pointer hover:text-emerald-700">
            View All Logs →
          </span>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center text-lg`}>
                <span>{activity.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-gray-800">{activity.action}</p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{activity.description}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <User size={12} />
                  {activity.staff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Staff Portal • Brgy. Pantal • Dagupan City
      </div>
    </div>
  );
};

export default StaffDashboard;