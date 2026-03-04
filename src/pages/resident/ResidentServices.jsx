import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  FileText,
  Bell
} from "lucide-react";
import { getServices } from "../../firebase/services";
import { addRequest } from "../../firebase/services";
import { addNotification } from "../../firebase/services";
import RequestForm from "../../components/RequestForm";

const ResidentServices = ({ residentId, residentName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = (service) => {
    setSelectedService(service);
    setShowRequestForm(true);
  };

  const handleSubmitRequest = async (formData) => {
    setSubmitting(true);
    try {
      const requestData = {
        residentId,
        residentName,
        serviceId: formData.serviceId,
        serviceName: formData.serviceName,
        purpose: formData.purpose,
        additionalNotes: formData.additionalNotes,
        status: "pending",
        type: formData.serviceName
      };
      
      const result = await addRequest(requestData);
      
      // Add notification
      await addNotification({
        residentId,
        title: "Request Submitted",
        message: `Your request for ${formData.serviceName} has been submitted successfully.`,
        type: "request",
        requestId: result.id
      });
      
      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const filteredServices = searchTerm
    ? services.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : services;

  if (loading) {
    return (
      <div className="ml-64 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
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
                <FileText size={24} className="text-emerald-600" />
                Barangay Services
              </h1>
              <p className="text-sm text-gray-500">Request certificates and documents</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">
                    {service.icon || "📄"}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-emerald-600" />
                    <span className="font-medium">Processing:</span>
                    <span>{service.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-emerald-600" />
                    <span className="font-medium">Fee:</span>
                    <span>{service.fee}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.requirements?.map((req, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleRequestClick(service)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition font-medium"
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Need Assistance?</h3>
              <p className="text-sm text-gray-600">
                Visit the Barangay Hall for help with document requests. Our staff is ready to assist you.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Request Form Modal */}
      <RequestForm
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
        onSubmit={handleSubmitRequest}
        services={services}
      />
    </div>
  );
};

export default ResidentServices;