import { useState } from "react";
import { 
  FileText, 
  Search, 
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Eye
} from "lucide-react";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const requests = [
    {
      id: "R1",
      name: "Juan dela Cruz",
      type: "Barangay Clearance",
      purpose: "Job Application",
      date: "2026-01-10",
      status: "pending",
      ref: "R1"
    },
    {
      id: "R2",
      name: "Ana Reyes",
      type: "Certificate of Residency",
      purpose: "Bank Requirement",
      date: "2026-01-15",
      status: "processing",
      ref: "R2"
    },
    {
      id: "R3",
      name: "Roberto Garcia",
      type: "Business Permit",
      purpose: "New Business",
      date: "2026-01-16",
      status: "completed",
      ref: "R3"
    },
    {
      id: "R4",
      name: "Maria Santos",
      type: "Indigency Certificate",
      purpose: "Medical Assistance",
      date: "2026-01-17",
      status: "pending",
      ref: "R4"
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'processing': return <RefreshCw size={16} className="text-blue-600" />;
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected': return <XCircle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Requests</h1>
        <p className="text-gray-600">Manage and process resident requests</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">23</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Processing</p>
          <p className="text-2xl font-bold text-blue-600">45</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">88</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {['pending', 'processing', 'completed'].map((tab) => (
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

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search requests by name or reference..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-4">{filteredRequests.length} requests found</p>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{request.name}</h3>
                <p className="text-emerald-600 font-medium">{request.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  {request.status}
                </span>
                <span className="text-xs text-gray-400">REF: {request.ref}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{request.purpose}</p>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-400">{request.date}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center gap-1">
                  <Eye size={16} />
                  View
                </button>
                {request.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      Process
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                      Reject
                    </button>
                  </>
                )}
                {request.status === 'processing' && (
                  <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition">
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;