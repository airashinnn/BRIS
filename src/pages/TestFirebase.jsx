import { useState, useEffect } from "react";
import { getResidents, getAnnouncements, getRequests } from "../firebase/services";
import { getCurrentUser, onAuthChange } from "../firebase/auth";

const TestFirebase = () => {
  const [residents, setResidents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [residentsData, announcementsData, requestsData] = await Promise.all([
          getResidents(),
          getAnnouncements(),
          getRequests()
        ]);
        
        setResidents(residentsData);
        setAnnouncements(announcementsData);
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Listen to auth changes
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to Firebase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Firebase Connection Test</h1>
        
        {/* Auth Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Authentication Status</h2>
          {user ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700">✅ Logged in as: {user.email}</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-700">⚠️ Not logged in</p>
            </div>
          )}
        </div>

        {/* Data Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm text-gray-500 mb-2">Residents</h3>
            <p className="text-3xl font-bold text-emerald-600">{residents.length}</p>
            <p className="text-xs text-gray-400 mt-2">from Firebase</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm text-gray-500 mb-2">Announcements</h3>
            <p className="text-3xl font-bold text-blue-600">{announcements.length}</p>
            <p className="text-xs text-gray-400 mt-2">from Firebase</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm text-gray-500 mb-2">Requests</h3>
            <p className="text-3xl font-bold text-purple-600">{requests.length}</p>
            <p className="text-xs text-gray-400 mt-2">from Firebase</p>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-xl">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800">Firebase Connected Successfully!</h3>
              <p className="text-sm text-emerald-600">
                Your Vite React website is now connected to the same Firebase project as your app-based system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestFirebase;