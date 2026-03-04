import { useState } from "react";
import { 
  Megaphone, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  Search,
  Filter
} from "lucide-react";

const Announcements = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const announcements = [
    {
      id: 1,
      title: "Community Clean-Up Drive",
      date: "Jan 14, 2026",
      content: "Join us for a community clean-up drive this Saturday, January 20, 2026. Let's keep Pantal clean and beautiful!",
      category: "Event",
      author: "Admin",
      status: "Published"
    },
    {
      id: 2,
      title: "Free Medical Check-Up for Senior Citizens",
      date: "Jan 13, 2026",
      content: "Free medical check-up for senior citizens will be held on January 30, 2026 at the Barangay Health Center.",
      category: "Health",
      author: "Admin",
      status: "Published"
    },
    {
      id: 3,
      title: "Barangay Assembly Meeting",
      date: "Jan 12, 2026",
      content: "Monthly barangay assembly meeting on January 25, 2026 at 2:00 PM. All residents are encouraged to attend.",
      category: "Meeting",
      author: "Admin",
      status: "Published"
    }
  ];

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Announcements</h1>
          <p className="text-gray-600">Create and manage barangay announcements</p>
        </div>
        
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Create Announcement Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Megaphone className="text-emerald-600" size={24} />
            Create New Announcement
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Community Clean-Up Drive"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  <option>Event</option>
                  <option>Health</option>
                  <option>Meeting</option>
                  <option>Emergency</option>
                  <option>Reminder</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                rows="4"
                placeholder="Write your announcement content here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Publish Announcement
              </button>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{announcement.title}</h2>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {announcement.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {announcement.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      Posted by {announcement.author}
                    </span>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {announcement.status}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-4">
                {announcement.content}
              </p>

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

export default Announcements;