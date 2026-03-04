import { Search, MoreVertical, UserPlus, Filter, Mail, Phone } from "lucide-react";
import { useState } from "react";

const Residents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const residents = [
    { id: 1, name: "Juan dela Cruz", age: 45, gender: "Male", address: "Block 1, Lot 5, Pantal, Dagupan City", category: "Voter", status: "Active", avatar: "JD" },
    { id: 2, name: "Maria dela Cruz", age: 42, gender: "Female", address: "Block 1, Lot 5, Pantal, Dagupan City", category: "Voter", status: "Active", avatar: "MD" },
    { id: 3, name: "Pedro Santos", age: 68, gender: "Male", address: "Block 2, Lot 12, Pantal, Dagupan City", category: "Senior", status: "Active", avatar: "PS" },
    { id: 4, name: "Ana Reyes", age: 35, gender: "Female", address: "Block 3, Lot 8, Pantal, Dagupan City", category: "Voter", status: "Active", avatar: "AR" },
    { id: 5, name: "Roberto Garcia", age: 52, gender: "Male", address: "Block 1, Lot 15, Pantal, Dagupan City", category: "Voter", status: "Active", avatar: "RG" },
    { id: 6, name: "Lorna Garcia", age: 48, gender: "Female", address: "Block 1, Lot 15, Pantal, Dagupan City", category: "PWD", status: "Active", avatar: "LG" },
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Residents</h1>
          <p className="text-gray-600">Manage and view resident information</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <UserPlus size={18} />
          <span>Add New Resident</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-4">6 Results found</p>

      {/* Residents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {residents.map((resident) => (
          <div key={resident.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                  resident.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'
                }`}>
                  {resident.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{resident.name}</h3>
                  <p className="text-xs text-gray-500">#{resident.id} • {resident.gender}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Age:</span>
                <span className="text-gray-800">{resident.age} yrs old</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-500 text-sm">Address:</span>
                <span className="text-gray-800 text-sm flex-1">{resident.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(resident.category)}`}>
                  {resident.category}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {resident.status}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Mail size={16} />
                Message
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition">
                <Phone size={16} />
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Residents;