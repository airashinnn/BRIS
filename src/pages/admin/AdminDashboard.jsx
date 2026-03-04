import { 
  Users, 
  Home, 
  Clock, 
  FileText, 
  PlusCircle,
  BarChart3,
  Bell,
  CheckCircle
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Residents", value: "156", icon: <Users size={32} />, change: "+12%", color: "blue" },
    { title: "Households", value: "48", icon: <Home size={32} />, change: "+4%", color: "green" },
    { title: "Pending Requests", value: "23", icon: <Clock size={32} />, change: "-8%", color: "yellow" },
    { title: "Completed", value: "189", icon: <CheckCircle size={32} />, change: "+23%", color: "purple" },
  ];

  const recentActivities = [
    { user: "Juan dela Cruz", action: "added as new resident", time: "2 hours ago", icon: "👤" },
    { user: "Ana Reyes", action: "requested Barangay Clearance", time: "5 hours ago", icon: "📄" },
    { user: "Garcia Family", action: "updated household records", time: "1 day ago", icon: "🏠" },
    { user: "Pedro Santos", action: "approved Certificate", time: "2 days ago", icon: "✅" },
  ];

  const recentRequests = [
    { name: "Juan dela Cruz", type: "Barangay Clearance", purpose: "Job Application", date: "2026-01-10", status: "pending" },
    { name: "Ana Reyes", type: "Certificate of Residency", purpose: "Bank Requirement", date: "2026-01-15", status: "approved" },
    { name: "Roberto Garcia", type: "Business Permit", purpose: "New Business", date: "2026-01-16", status: "processing" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin! Here's what's happening in Brgy. Pantal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                <div className={`text-${stat.color}-600`}>{stat.icon}</div>
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition group">
            <PlusCircle className="text-blue-600 mb-2 group-hover:scale-110 transition" size={24} />
            <span className="text-sm font-medium text-gray-700">Add Resident</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:shadow-md transition group">
            <BarChart3 className="text-green-600 mb-2 group-hover:scale-110 transition" size={24} />
            <span className="text-sm font-medium text-gray-700">Reports</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-yellow-500 hover:shadow-md transition group">
            <FileText className="text-yellow-600 mb-2 group-hover:scale-110 transition" size={24} />
            <span className="text-sm font-medium text-gray-700">Requests</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-xl p-4 hover:border-purple-500 hover:shadow-md transition group">
            <Bell className="text-purple-600 mb-2 group-hover:scale-110 transition" size={24} />
            <span className="text-sm font-medium text-gray-700">Announce</span>
          </button>
        </div>
      </div>

      {/* Recent Activity and Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-800">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Requests</h2>
          <div className="space-y-4">
            {recentRequests.map((request, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{request.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-1">{request.type}</p>
                <p className="text-sm text-gray-600 mb-2">{request.purpose}</p>
                <p className="text-xs text-gray-400">{request.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;