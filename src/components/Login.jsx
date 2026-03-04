import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, registerResident } from "../firebase/auth";
import { Mail, Lock, LogIn, UserPlus, AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Registration fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginWithEmail(email, password);
      
      if (result.success) {
        // Redirect based on role
        if (result.role === "admin") {
          navigate("/admin");
        } else if (result.role === "staff") {
          navigate("/staff");
        } else {
          navigate("/resident");
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !address || !phone) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const residentData = {
        name,
        address,
        phone,
        email,
        age: 0,
        gender: "",
        civilStatus: "",
        occupation: "",
        voterStatus: "Unregistered",
        seniorCitizen: false,
        pwd: false,
        birthdate: "",
        createdAt: new Date().toISOString()
      };

      const result = await registerResident(email, password, residentData);
      
      if (result.success) {
        setError("");
        alert("Registration successful! Please login.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setName("");
        setAddress("");
        setPhone("");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setEmail("admin@barangaypantal.com");
      setPassword("admin123");
    } else if (role === "staff") {
      setEmail("staff@barangaypantal.com");
      setPassword("staff123");
    } else {
      setEmail("resident@barangaypantal.com");
      setPassword("resident123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl">🏛️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Brgy. Pantal</h1>
          <p className="text-gray-600">Dagupan City</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 font-medium rounded-lg transition ${
              isLogin 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 font-medium rounded-lg transition ${
              !isLogin 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Juan dela Cruz"
                  required={!isLogin}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Block 1, Lot 5, Pantal, Dagupan City"
                  required={!isLogin}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="09171234567"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : isLogin ? (
              <>
                <LogIn size={18} />
                Login
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Register
              </>
            )}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-6">
          <p className="text-xs text-gray-400 text-center mb-3">Demo Login (for testing)</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg transition"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin("staff")}
              className="flex-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-lg transition"
            >
              Staff
            </button>
            <button
              onClick={() => handleDemoLogin("resident")}
              className="flex-1 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 rounded-lg transition"
            >
              Resident
            </button>
          </div>
        </div>

        {isLogin && (
          <p className="text-xs text-center text-gray-400 mt-4">
            For demo: Use any email/password or click demo buttons above
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;