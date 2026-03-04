import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  LogOut,
  ArrowLeft,
  User,
  Briefcase,
  Heart,
  Award,
  Home
} from "lucide-react";

const ResidentProfile = ({ residentData = {} }) => {
  const navigate = useNavigate();
  
  const resident = {
    name: residentData?.name || "Juan dela Cruz",
    age: residentData?.age || 45,
    gender: residentData?.gender || "Male",
    civilStatus: residentData?.civilStatus || "Married",
    occupation: residentData?.occupation || "Fisherman",
    phone: residentData?.phone || "09171234567",
    address: residentData?.address || "Block 1, Lot 5, Pantal, Dagupan City",
    householdId: residentData?.householdId || "H1",
    voterStatus: residentData?.voterStatus || "Registered",
    seniorCitizen: residentData?.seniorCitizen || false,
    pwd: residentData?.pwd || false,
    email: residentData?.email || "juan.delacruz@email.com",
    birthdate: residentData?.birthdate || "January 15, 1981"
  };

  const handleLogout = () => {
    navigate("/login");
  };

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
                <User size={24} className="text-emerald-600" />
                My Profile
              </h1>
              <p className="text-sm text-gray-500">Your personal information</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">
                {resident.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{resident.name}</h2>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <Briefcase size={16} className="text-emerald-600" />
                {resident.occupation}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                  <Award size={12} />
                  {resident.voterStatus} Voter
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User size={20} className="text-emerald-600" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400">Full Name</p>
              <p className="text-gray-800 font-medium">{resident.name}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400">Age</p>
              <p className="text-gray-800 font-medium">{resident.age} years old</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400">Birthdate</p>
              <p className="text-gray-800 font-medium">{resident.birthdate}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400">Gender</p>
              <p className="text-gray-800 font-medium">{resident.gender}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400">Civil Status</p>
              <p className="text-gray-800 font-medium">{resident.civilStatus}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400">Occupation</p>
              <p className="text-gray-800 font-medium">{resident.occupation}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart size={20} className="text-emerald-600" />
            Contact Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone size={18} className="text-emerald-600" />
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-gray-800 font-medium">{resident.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin size={18} className="text-emerald-600" />
              <div>
                <p className="text-xs text-gray-400">Address</p>
                <p className="text-gray-800 font-medium">{resident.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail size={18} className="text-emerald-600" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-gray-800 font-medium">{resident.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Household Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Home size={20} className="text-emerald-600" />
            Household Information
          </h3>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400">Household ID</p>
            <p className="text-gray-800 font-medium">{resident.householdId}</p>
          </div>
        </div>

        {/* Classification & Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Classification & Status</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Voter Registration</span>
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <CheckCircle size={16} />
                {resident.voterStatus}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Senior Citizen</span>
              {resident.seniorCitizen ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle size={16} />
                  Yes
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <XCircle size={16} />
                  No
                </span>
              )}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Person with Disability</span>
              {resident.pwd ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle size={16} />
                  Yes
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <XCircle size={16} />
                  No
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Need to Update Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Need to Update Your Information?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please visit the Barangay Hall to update your personal information or contact us for assistance.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">📍 Barangay Hall, Pantal, Dagupan City</p>
            <p className="flex items-center gap-2">📞 (075) 123-4567</p>
            <p className="flex items-center gap-2">🕒 Mon-Fri, 8:00 AM - 5:00 PM</p>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full bg-white border border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-50 transition font-medium flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </main>
    </div>
  );
};

export default ResidentProfile;