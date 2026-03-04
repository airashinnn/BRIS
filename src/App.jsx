import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // <- MAY Navigate NA TO
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import StaffSidebar from "./components/StaffSidebar";
import ResidentSidebar from "./components/ResidentSidebar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Residents from "./pages/admin/Residents";
import Households from "./pages/admin/Households";
import Announcements from "./pages/admin/Announcements";
import Services from "./pages/admin/Services";
import Requests from "./pages/admin/Requests";
import StaffManagement from "./pages/admin/StaffManagement";
import Reports from "./pages/admin/Reports";

// Staff Pages
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffRequests from "./pages/staff/StaffRequests";
import StaffResidents from "./pages/staff/StaffResidents";
import StaffHouseholds from "./pages/staff/StaffHouseholds";
import StaffAnnouncements from "./pages/staff/StaffAnnouncements";
import StaffActivityLog from "./pages/staff/StaffActivityLog";

// Resident Pages
import ResidentHome from "./pages/resident/ResidentHome";
import ResidentNews from "./pages/resident/ResidentNews";
import ResidentServices from "./pages/resident/ResidentServices";
import ResidentRequests from "./pages/resident/ResidentRequests";
import ResidentProfile from "./pages/resident/ResidentProfile";

// Firebase
import { onAuthChange, getCurrentUser } from "./firebase/auth";
// import { getResidentByUserId } from "./firebase/services"; // Comment out muna

// Test Page
import TestFirebase from "./pages/TestFirebase";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [residentData, setResidentData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          // For demo purposes, set to resident with data
          setUserRole("resident");
          setResidentData({
            id: "R123",
            name: "Juan dela Cruz",
            address: "Block 1, Lot 5, Pantal, Dagupan City",
            age: 45,
            civilStatus: "Married",
            occupation: "Fisherman",
            voterStatus: "Registered",
            pendingRequests: 0,
            completedRequests: 1,
            gender: "Male",
            phone: "09171234567",
            householdId: "H1",
            seniorCitizen: false,
            pwd: false,
            email: "juan.delacruz@email.com",
            birthdate: "January 15, 1981"
          });
        } else {
          // Not logged in - redirect to login
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen to auth changes
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      if (!user) {
        setUserRole(null);
        setResidentData(null);
        setStaffData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test-firebase" element={<TestFirebase />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <div className="flex">
              <Sidebar role="admin" />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/residents" element={<Residents />} />
                  <Route path="/households" element={<Households />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/staff" element={<StaffManagement />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff/*"
          element={
            <div className="flex">
              <StaffSidebar staffName={staffData?.name || "Maria Santos"} />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<StaffDashboard />} />
                  <Route path="/requests" element={<StaffRequests />} />
                  <Route path="/residents" element={<StaffResidents />} />
                  <Route path="/households" element={<StaffHouseholds />} />
                  <Route path="/announcements" element={<StaffAnnouncements />} />
                  <Route path="/activity-log" element={<StaffActivityLog />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* Resident Routes with Sidebar */}
        <Route
          path="/resident/*"
          element={
            <div className="flex">
              <ResidentSidebar residentName={residentData?.name || "Juan dela Cruz"} />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<ResidentHome residentData={residentData} />} />
                  <Route path="/news" element={<ResidentNews />} />
                  <Route path="/services" element={<ResidentServices />} />
                  <Route path="/requests" element={<ResidentRequests residentId={residentData?.id} />} />
                  <Route path="/profile" element={<ResidentProfile residentData={residentData} />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* Redirect based on role */}
        <Route path="/dashboard" element={
          userRole === "admin" ? <Navigate to="/admin" /> :
          userRole === "staff" ? <Navigate to="/staff" /> :
          userRole === "resident" ? <Navigate to="/resident" /> :
          <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;