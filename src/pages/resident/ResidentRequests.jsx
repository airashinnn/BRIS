import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search,
  ChevronRight,
  Clock,
  Download,
  ArrowLeft,
  Inbox,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { getRequestsByResident } from "../../firebase/services";

const ResidentRequests = ({ residentId = "R123" }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (residentId) {
      fetchRequests();
    }
  }, [residentId]);

  const fetchRequests = async () => {
    try {
      const data = await getRequestsByResident(residentId);
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    processing: requests.filter(r => r.status === 'processing').length,
    completed: requests.filter(r => r.status === 'completed').length,
    total: requests.length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✅';
      case 'processing': return '🔄';
      case 'pending': return '⏳';
      default: return '📄';
    }
  };

  const filteredRequests = activeTab === 'all' 
    ? requests 
    : requests.filter(r => r.status === activeTab);

  if (loading) {
    return (
      <div className="ml-64 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/resident" className="text-gray-600 hover:text-emerald-600">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Inbox size={24} className="text-emerald-600" />
                My Requests
              </h1>
              <p className="text-sm text-gray-500">Track your document requests</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Stats Summary */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg p-6 text-white mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Inbox size={24} />
                Requests Summary
              </h2>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-emerald-100 text-sm">Pending</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Processing</p>
                  <p className="text-3xl font-bold">{stats.processing}</p>
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Completed</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="text-6xl">📋</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['all', 'pending', 'processing', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm capitalize transition ${
                activeTab === tab
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} {tab === 'all' ? `(${stats.total})` : 
                     tab === 'pending' ? `(${stats.pending})` :
                     tab === 'processing' ? `(${stats.processing})` :
                     `(${stats.completed})`}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      request.status === 'completed' ? 'bg-green-100' :
                      request.status === 'processing' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{request.serviceName || request.type}</h3>
                      <p className="text-sm text-gray-600">Purpose: {request.purpose}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>

                <div className="mb-3 text-sm">
                  <span className="text-gray-400">Request ID: </span>
                  <span className="text-gray-600 font-mono">{request.id}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">{request.additionalNotes || request.notes}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {request.date}
                  </span>
                  {request.status === 'completed' && (
                    <button className="flex items-center gap-1 text-sm bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition font-medium">
                      <Download size={16} />
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No requests found</h3>
            <p className="text-gray-500">You haven't made any {activeTab} requests yet.</p>
            <Link to="/resident/services" className="inline-block mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition">
              Browse Services
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResidentRequests;