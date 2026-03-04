import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Services = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const services = [
    {
      id: 1,
      name: "Barangay Clearance",
      description: "Certificate of residency required for various purposes",
      requirements: ["Valid ID", "Proof of Residency", "Cedula"],
      processingTime: "1-2 days",
      fee: "₱50.00",
      status: "Active"
    },
    {
      id: 2,
      name: "Barangay Indigency",
      description: "Certificate for those who need financial assistance",
      requirements: ["Valid ID", "Barangay Certificate", "Medical Certificate (if applicable)"],
      processingTime: "1 day",
      fee: "Free",
      status: "Active"
    },
    {
      id: 3,
      name: "Certificate of Residency",
      description: "Proof of residency in Barangay Pantal",
      requirements: ["Valid ID", "Proof of Billing"],
      processingTime: "1 day",
      fee: "₱30.00",
      status: "Active"
    },
    {
      id: 4,
      name: "Business Permit",
      description: "Permit for business operations within the barangay",
      requirements: ["Business Name Registration", "DTI/SEC Registration", "Valid ID"],
      processingTime: "3-5 days",
      fee: "₱500.00",
      status: "Active"
    }
  ];

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Services</h1>
          <p className="text-gray-600">Manage barangay services and requirements</p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name
              </label>
              <input
                type="text"
                placeholder="e.g., Barangay Clearance"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fee
              </label>
              <input
                type="text"
                placeholder="₱50.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="2"
              placeholder="Service description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              rows="3"
              placeholder="Valid ID&#10;Proof of Residency&#10;Cedula"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processing Time
              </label>
              <input
                type="text"
                placeholder="1-2 days"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
              Save Service
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {service.status}
                </span>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  {service.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div className="flex gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={16} className="text-emerald-600" />
                  <span>{service.processingTime}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="font-medium">Fee:</span>
                  <span className="text-emerald-600 font-medium">{service.fee}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Edit size={18} />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;