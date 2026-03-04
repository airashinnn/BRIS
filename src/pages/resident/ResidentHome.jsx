import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar,
  ChevronRight,
  FileText,
  Newspaper,
  MapPin,
  User,
  CheckCircle,
  Heart,
  Briefcase,
  Award,
  Clock,
  Bell
} from "lucide-react";
import { getAnnouncements } from "../../firebase/services";
import { getRequestsByResident } from "../../firebase/services";
import Notifications from "../../components/Notifications";

const ResidentHome = ({ residentData = {} }) => {
  const [resident] = useState({
    id: residentData?.id || "R123",
    name: residentData?.name || "Juan dela Cruz",
    address: residentData?.address || "Block 1, Lot 5, Pantal, Dagupan City",
    age: residentData?.age || 45,
    civilStatus: residentData?.civilStatus || "Married",
    occupation: residentData?.occupation || "Fisherman",
    voterStatus: residentData?.voterStatus || "Registered"
  });

  const [announcements, setAnnouncements] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [resident.id]);

  const fetchData = async () => {
    try {
      const [announcementsData, requestsData] = await Promise.all([
        getAnnouncements(),
        getRequestsByResident(resident.id)
      ]);
      
      setAnnouncements(announcementsData.slice(0, 2));
      setRequests(requestsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;

  const quickActions = [
    { name: "Request Document", icon: <FileText size={20} />, path: "/resident/services", color: "bg-blue-500" },
    { name: "View All News", icon: <Newspaper size={20} />, path: "/resident/news", color: "bg-green-500" },
  ];

  if (loading) {
    return (
      <div className="ml-64 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome to your resident portal</p>
            </div>
            <div className="flex items-center gap-3">
              <Notifications residentId={resident.id} />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{resident.name}</p>
                <p className="text-xs text-gray-500">Resident</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">
                  {resident.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg p-6 text-white mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {resident.name}!</h2>
              <p className="text-emerald-100 flex items-center gap-1">
                <MapPin size={16} />
                {resident.address}
              </p>
            </div>
            <div className="text-7xl">👤</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pending Requests Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                  <Clock size={18} className="text-yellow-600" />
                  Pending Requests
                </p>
                <p className="text-4xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl">
                <Clock size={32} className="text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Completed Requests Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  Completed
                </p>
                <p className="text-4xl font-bold text-green-600">{completedRequests}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${action.color} bg-opacity-10 rounded-lg`}>
                    <span className={action.color.replace('bg-', 'text-')}>{action.icon}</span>
                  </div>
                  <span className="font-medium text-gray-700">{action.name}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-emerald-600 transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Bell size={20} className="text-emerald-600" />
              Latest Announcements
            </h2>
            <Link to="/resident/news" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    announcement.priority === 'high' ? 'bg-red-100' : 'bg-emerald-100'
                  }`}>
                    {announcement.icon || "📢"}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">{announcement.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        announcement.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {announcement.priority === 'high' ? 'HIGH' : 'MEDIUM'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{announcement.content}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User size={20} className="text-emerald-600" />
            Profile Information
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-emerald-600" />
                <span className="text-gray-600">Age:</span>
              </div>
              <span className="text-gray-800 font-medium">{resident.age} years old</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-emerald-600" />
                <span className="text-gray-600">Civil Status:</span>
              </div>
              <span className="text-gray-800 font-medium">{resident.civilStatus}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Briefcase size={18} className="text-emerald-600" />
                <span className="text-gray-600">Occupation:</span>
              </div>
              <span className="text-gray-800 font-medium">{resident.occupation}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Award size={18} className="text-emerald-600" />
                <span className="text-gray-600">Voter Status:</span>
              </div>
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <CheckCircle size={16} />
                {resident.voterStatus}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResidentHome;