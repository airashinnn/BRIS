import { useState } from "react";
import { 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  PlayCircle,
  XCircle,
  Eye
} from "lucide-react";

const StaffRequests = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const requests = [
    {
      id: 1,
      name: "Juan dela Cruz",
      type: "Barangay Clearance",
      purpose: "Job Application",
      date: "2026-01-10",
      status: "completed",
      processedBy: "Maria Santos",
      completedDate: "2026-01-12"
    },
    {
      id: 2,
      name: "Ana Reyes",
      type: "Certificate of Residency",
      purpose: "Bank Requirement",
      date: "2026-01-15",
      status: "processing",
      processedBy: "Carlos Mendoza"
    },
    {
      id: 3,
      name: "Roberto Garcia",
      type: "Business Permit",
      purpose: "New Business",
      date: "2026-01-16",
      status: "pending"
    },
    {
      id: 4,
      name: "Maria dela Cruz",
      type: "Barangay Indigency",
      purpose: "Medical Assistance",
      date: "2026-01-17",
      status: "pending"
    },
    {
      id: 5,
      name: "Pedro Santos",
      type: "Senior Citizen ID",
      purpose: "Benefits",
      date: "2026-01-14",
      status: "completed",
      processedBy: "Maria Santos",
      completedDate: "2026-01-15"
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'processing': return <PlayCircle size={16} className="text-blue-600" />;
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected': return <XCircle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab !== 'all' && req.status !== activeTab) return false;
    if (searchTerm && !req.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Requests Management</h1>
        <p className="text-gray-600">Process and manage resident requests</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by resident name or service..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {['all', 'pending', 'processing', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize transition ${
              activeTab === tab
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{request.name}</h3>
                <p className="text-emerald-600 font-medium">{request.type}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(request.status)}`}>
                {getStatusIcon(request.status)}
                {request.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">Purpose: {request.purpose}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-400">Date Requested:</span>
                <p className="text-gray-700">{request.date}</p>
              </div>
              {request.processedBy && (
                <div>
                  <span className="text-gray-400">Processed By:</span>
                  <p className="text-gray-700">{request.processedBy}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Eye size={18} />
                <span>View</span>
              </button>
              {request.status === 'pending' && (
                <button className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <PlayCircle size={18} />
                  <span>Start Processing</span>
                </button>
              )}
              {request.status === 'processing' && (
                <button className="flex items-center gap-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                  <CheckCircle size={18} />
                  <span>Complete</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffRequests;