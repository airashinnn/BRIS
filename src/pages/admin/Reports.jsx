import { BarChart3, Download, Calendar, Users, Home, FileText, CheckCircle } from "lucide-react";

const Reports = () => {
  const reports = [
    { type: "Senior Citizens", count: 25, icon: <Users size={20} />, color: "blue" },
    { type: "Voters", count: 100, icon: <CheckCircle size={20} />, color: "green" },
    { type: "Minors", count: 45, icon: <Users size={20} />, color: "yellow" },
    { type: "PWD", count: 12, icon: <Users size={20} />, color: "purple" },
    { type: "Solo Parents", count: 18, icon: <Users size={20} />, color: "pink" },
    { type: "Households", count: 48, icon: <Home size={20} />, color: "indigo" },
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      yellow: "bg-yellow-50 text-yellow-600",
      purple: "bg-purple-50 text-purple-600",
      pink: "bg-pink-50 text-pink-600",
      indigo: "bg-indigo-50 text-indigo-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports</h1>
          <p className="text-gray-600">View and generate barangay reports</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Calendar size={18} />
            <span>Filter Date</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download size={18} />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Total Population</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">248</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Home className="text-green-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Households</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">48</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <FileText className="text-yellow-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Requests</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">156</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">189</p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-800">Demographic Reports</h2>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getColorClass(report.color)}`}>
                      {report.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{report.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.count}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${report.color}-600 h-2 rounded-full`} 
                        style={{ width: `${(report.count / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {Math.round((report.count / 100) * 100)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;