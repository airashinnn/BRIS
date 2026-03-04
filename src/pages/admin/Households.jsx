import { useState } from "react";
import { 
  Search, 
  Plus, 
  Users, 
  Edit, 
  Eye,
  User,
  Briefcase,
  Home as HomeIcon,
  MoreVertical
} from "lucide-react";

const Households = () => {
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Households</h1>
          <p className="text-gray-600">Manage household records and family members</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} />
          <span>Add Household</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search households by head or address..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-4">{households.length} Households found</p>

      {/* Households List */}
      <div className="space-y-6">
        {households.map((household) => (
          <div key={household.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Household Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <HomeIcon size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{household.head}</h2>
                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                      <span>📍</span> {household.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Users size={16} />
                    {household.totalMembers} Members
                  </span>
                </div>
              </div>
            </div>

            {/* Family Members */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Family Members
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {household.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{member.name}</span>
                        {member.role === "Head" && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Head
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {member.age} yrs • {member.occupation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Eye size={18} />
                  <span>View</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                  <Edit size={18} />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no households) */}
      {households.length === 0 && (
        <div className="text-center py-12">
          <HomeIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Households Found</h3>
          <p className="text-gray-500 mb-6">Get started by adding a new household</p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            Add Household
          </button>
        </div>
      )}
    </div>
  );
};

export default Households;