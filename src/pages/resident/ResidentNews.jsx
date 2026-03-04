import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar,
  Search,
  ChevronRight,
  AlertCircle,
  ArrowLeft,
  Bell
} from "lucide-react";

const ResidentNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from Firebase
    setTimeout(() => {
      setAnnouncements([
        {
          id: 1,
          title: "Barangay Assembly Meeting",
          content: "All residents are invited to attend the quarterly barangay assembly on January 25, 2026 at 2:00 PM at the Barangay Hall. This is an important meeting to discuss community projects, budget allocation, and upcoming events.",
          date: "Jan 15, 2026",
          priority: "high",
          icon: "📢"
        },
        {
          id: 2,
          title: "Community Clean-Up Drive",
          content: "Join us for a community clean-up drive this Saturday, January 20, 2026 at 7:00 AM. Let's keep Pantal clean and beautiful! Participants are requested to bring their own cleaning materials.",
          date: "Jan 14, 2026",
          priority: "medium",
          icon: "🧹"
        },
        {
          id: 3,
          title: "Free Medical Check-Up for Senior Citizens",
          content: "Free medical check-up for senior citizens will be held on January 30, 2026 at the Barangay Health Center. Services include blood pressure check, blood sugar test, and general consultation.",
          date: "Jan 13, 2026",
          priority: "medium",
          icon: "🏥"
        },
        {
          id: 4,
          title: "Barangay Fiesta Celebration",
          content: "Join us in celebrating our annual barangay fiesta on February 5-7, 2026. There will be games, food, and entertainment for all ages.",
          date: "Jan 12, 2026",
          priority: "medium",
          icon: "🎉"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAnnouncements = searchTerm
    ? announcements.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : announcements;

  if (loading) {
    return (
      <div className="ml-64 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading announcements...</p>
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
                <Bell size={24} className="text-emerald-600" />
                Announcements
              </h1>
              <p className="text-sm text-gray-500">Stay updated with barangay news</p>
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
              placeholder="Search announcements..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">{filteredAnnouncements.length} announcements found</p>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                    announcement.priority === 'high' ? 'bg-red-100' : 'bg-emerald-100'
                  }`}>
                    {announcement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-semibold text-gray-800 text-lg">{announcement.title}</h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        announcement.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {announcement.priority === 'high' ? 'HIGH PRIORITY' : 'MEDIUM PRIORITY'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{announcement.content}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Stay Informed</h3>
              <p className="text-sm text-gray-600">
                Check this page regularly for important updates, events, and announcements from Barangay Pantal.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResidentNews;