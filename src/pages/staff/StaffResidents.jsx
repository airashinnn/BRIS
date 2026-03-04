import { useState } from "react";
import { 
  Search, 
  Eye,
  Lock
} from "lucide-react";

const StaffResidents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const residents = [
    { id: 1, name: "Juan dela Cruz", age: 45, address: "Block 1, Lot 5, Pantal, Dagupan City", contact: "09171234567", category: "Voter", status: "Active" },
    { id: 2, name: "Maria dela Cruz", age: 42, address: "Block 1, Lot 5, Pantal, Dagupan City", contact: "09181234567", category: "Voter", status: "Active" },
    { id: 3, name: "Pedro Santos", age: 68, address: "Block 2, Lot 12, Pantal, Dagupan City", contact: "09191234567", category: "Senior", status: "Active" },
    { id: 4, name: "Ana Reyes", age: 35, address: "Block 3, Lot 8, Pantal, Dagupan City", contact: "09201234567", category: "Voter", status: "Active" },
    { id: 5, name: "Roberto Garcia", age: 52, address: "Block 1, Lot 15, Pantal, Dagupan City", contact: "09211234567", category: "Voter", status: "Active" },
    { id: 6, name: "Lorna Garcia", age: 48, address: "Block 1, Lot 15, Pantal, Dagupan City", contact: "09221234567", category: "PWD", status: "Active" },
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Senior': return 'bg-orange-100 text-orange-700';
      case 'PWD': return 'bg-green-100 text-green-700';
      case 'Voter': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Residents Directory</h1>
        <p className="text-gray-600">View resident information (read-only)</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search residents by name or address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Read-only Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-2">
        <Lock size={18} className="text-blue-600" />
        <p className="text-sm text-blue-700">You have read-only access to resident information.</p>
      </div>

      {/* Residents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {residents.map((resident) => (
              <tr key={resident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{resident.name}</p>
                    <p className="text-xs text-gray-400">#{resident.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{resident.age}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{resident.address}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{resident.contact}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(resident.category)}`}>
                    {resident.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Eye size={16} />
                    <span className="text-sm">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mt-4">{residents.length} residents found</p>
    </div>
  );
};

export default StaffResidents;