// Dashboard.tsx
import { useState } from "react";
import axios from "axios";
import { useContent } from "../hooks/useContent";
import { SideBar } from "../components/SideBar";
import { Card } from "../components/Card";
import { CreateContent } from "../components/CreateContent";
import {Button} from "../components/Button";
import {PlusIcon} from "../icons/PlusIcon";
import {ShareIcon} from "../icons/ShareIcon";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { BACKEND_URL } from "../Config";


interface ShareLinkResponse {
  hash: string;
}

// Fallback function for copying to clipboard
const fallbackCopyToClipboard = (text: string) => {
  try {
    // Create a temporary text area
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Try to copy using the old execCommand method
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      
      alert(`🎉 Share link copied to clipboard!\n\n${text}\n\nAnyone with this link can view your brain.`);
    } else {
      
      // Last resort - show prompt for manual copying
      prompt('📋 Copy this link manually (Ctrl+C):', text);
    }
  } catch (error) {
    // Last resort - show prompt for manual copying
    prompt('📋 Copy this link manually (Ctrl+C):', text);
  }
};

const DashBoard = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const contents = useContent();
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const filteredContents = filterType 
    ? contents.filter((content) => content.type === filterType)
    : contents;

  const handleShare = async () => {
    if (isSharing) return; // Prevent multiple clicks
    
    try {
      setIsSharing(true);
      
      const res = await axios.post<ShareLinkResponse>(
        `${BACKEND_URL}/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      
      const shareUrl = `${window.location.origin}/brain/${res.data.hash}`;
      
      // Try to copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert(`${shareUrl}`);
        } catch (clipboardError) {
          // Fallback method using a temporary text area
          fallbackCopyToClipboard(shareUrl);
        }
      } else {
        fallbackCopyToClipboard(shareUrl);
      }
    } catch (err: any) {
     
      
      const errorMsg = err.response?.data?.msg || "Something went wrong while sharing.";
      alert(`❌ ${errorMsg}`);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <SideBar 
        onSelect={setFilterType} 
        selected={filterType} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 z-30 transition-colors duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="p-4 lg:ml-72 min-h-screen bg-gray-100 dark:bg-gray-900 border transition-colors duration-300">
        <CreateContent open={modelOpen} onClose={() => setModelOpen(false)} />

        {/* Header - responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-12 lg:mt-0">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">My Brain</div>
            <DarkModeToggle />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button
              onClick={() => setModelOpen(true)}
              text="Add content"
              variant="primary"
              startIcon={<PlusIcon />}
              fullWidth={true}
              className="sm:w-auto"
            />
            <Button
              onClick={handleShare}
              text={isSharing ? "Sharing..." : "Share brain"}
              variant="secondary"
              startIcon={<ShareIcon />}
              disabled={isSharing}
              fullWidth={true}
              className="sm:w-auto"
            />
          </div>
        </div>

        {filterType && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
            Showing only: <strong>{filterType}</strong>
          </div>
        )}

        {/* Cards grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6">
          {(Array.isArray(filteredContents) ? filteredContents : []).map(
            ({ type, link, title, _id }) => (
              <Card
                key={_id}
                contentId={_id}
                title={title}
                link={link}
                type={type}
              />
            )
          )}
        </div>
        
      </div>
    </div>
  );
};

export default DashBoard;