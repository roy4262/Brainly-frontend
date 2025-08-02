import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { BACKEND_URL } from "../Config";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "link";
}

interface SharedBrainResponse {
  content: SharedContent[];
  owner: string;
  sharedAt: string;
}

const SharedBrain = () => {
  const { shareHash } = useParams<{ shareHash: string }>();
  const [content, setContent] = useState<SharedContent[]>([]);
  const [owner, setOwner] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filterType, setFilterType] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        setLoading(true);
        const response = await axios.get<SharedBrainResponse>(`${BACKEND_URL}/brain/${shareHash}`);
        setContent(response.data.content);
        setOwner(response.data.owner);
        setError("");
      } catch (err: any) {
        setError(err.response?.data?.msg || "Failed to load shared brain");
      } finally {
        setLoading(false);
      }
    };

    if (shareHash) {
      fetchSharedBrain();
    }
  }, [shareHash]);

  // Temporarily show all content for debugging
  const filteredContents = content; // filterType 
    // ? content.filter((item) => item.type === filterType)
    // : content;



  const contentTypes = ["youtube", "twitter", "document", "link"];
  const getTypeCount = (type: string) => content.filter(item => item.type === type).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">Loading shared brain...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="text-xl text-red-600 dark:text-red-400 mb-4 transition-colors duration-300">❌ {error}</div>
          <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">This shared brain link may be invalid or expired.</div>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
    {/* Header */}
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              🧠 {owner} Brainly
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
              Shared knowledge collection • {content.length} items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">🔗 Shared Brain</div>
          </div>
        </div>
      </div>
    </div>

    {/* Body with Sidebar and Main Content */}
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto p-4 transition-colors duration-300">
        <div className="space-y-2">
          <button
            onClick={() => setFilterType(null)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              filterType === null 
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            📚 All Content ({content.length})
          </button>

          {contentTypes.map((type) => {
            const count = getTypeCount(type);
            if (count === 0) return null;

            const icons = {
              youtube: "🎥",
              twitter: "🐦", 
              document: "📄",
              link: "🔗"
            };

            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  filterType === type 
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {icons[type as keyof typeof icons]} {type.charAt(0).toUpperCase() + type.slice(1)} ({count})
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
    

        {filterType && (
          <div className="mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Showing only: <strong className="text-purple-600 dark:text-purple-400 transition-colors duration-300">{filterType}</strong>
            </span>
          </div>
        )}

        {filteredContents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">
              {filterType ? `No ${filterType} content found` : "No content shared yet"}
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredContents.map((item) => {
              return (
                <Card
                  key={item._id}
                  contentId={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  isSharedView={true}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  </div>
);
} 
export default SharedBrain;