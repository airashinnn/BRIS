import { useState } from "react";
import { 
  Megaphone, 
  Search,
  Plus,
  Eye,
  Calendar,
  Clock
} from "lucide-react";

const StaffAnnouncements = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const announcements = [
    {
      id: 1,
      title: "Community Clean-Up Drive",
      date: "Jan 14, 2026",
      content: "Join us for a community clean-up drive this Saturday, January 20, 2026. Let's keep Pantal clean and beautiful!",
      category: "Event",
      author: "Maria Santos"
    },
    {
      id: 2,
      title: "Free Medical Check-Up for Senior Citizens",
      date: "Jan 13, 2026",
      content: "Free medical check-up for senior citizens will be held on January 30, 2026 at the Barangay Health Center.",
      category: "Health",
      author: "Maria Santos"
    },
    {
      id: 3,
      title: "Barangay Assembly Meeting",
      date: "Jan 12, 2026",
      content: "Monthly barangay assembly meeting on January 25, 2026 at 2:00 PM. All residents are encouraged to attend.",
      category: "Meeting",
      author: "Carlos Mendoza"
    }
  ];

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Announcements</h1>
          <p className="text-gray-600">View and create announcements</p>
        </div>
        
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Announcement</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Announcement title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                <option>Event</option>
                <option>Health</option>
                <option>Meeting</option>
                <option>Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Write your announcement..."
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Post Announcement
              </button>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{announcement.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {announcement.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    By {announcement.author}
                  </span>
                </div>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                {announcement.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{announcement.content}</p>

            <div className="flex justify-end">
              <button className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Eye size={18} />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffAnnouncements;