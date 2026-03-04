import { useState } from "react";
import { 
  Search, 
  Home,
  Users,
  Eye,
  Lock
} from "lucide-react";

const StaffHouseholds = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const households = [
    {
      id: 1,
      head: "Juan dela Cruz",
      address: "Block 1, Lot 5, Pantal, Dagupan City",
      members: [
        { name: "Juan dela Cruz", age: 45, occupation: "Fisherman", role: "Head" },
        { name: "Maria dela Cruz", age: 42, occupation: "Vendor", role: "Spouse" },
      ],
      totalMembers: 2
    },
    {
      id: 2,
      head: "Pedro Santos",
      address: "Block 2, Lot 12, Pantal, Dagupan City",
      members: [
        { name: "Pedro Santos", age: 68, occupation: "Retired", role: "Head" },
      ],
      totalMembers: 1
    },
    {
      id: 3,
      head: "Roberto Garcia",
      address: "Block 1, Lot 15, Pantal, Dagupan City",
      members: [
        { name: "Roberto Garcia", age: 52, occupation: "Driver", role: "Head" },
        { name: "Lorna Garcia", age: 48, occupation: "Housewife", role: "Spouse" },
      ],
      totalMembers: 2
    }
  ];

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Households</h1>
        <p className="text-gray-600">View household information (read-only)</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search households by head or address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Read-only Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-2">
        <Lock size={18} className="text-blue-600" />
        <p className="text-sm text-blue-700">You have read-only access to household information.</p>
      </div>

      {/* Households List */}
      <div className="space-y-6">
        {households.map((household) => (
          <div key={household.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Home size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{household.head}</h2>
                    <p className="text-gray-600">{household.address}</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Users size={16} />
                  {household.totalMembers} Members
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">Family Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {household.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-600">
                        {member.age} yrs • {member.occupation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Eye size={18} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffHouseholds;