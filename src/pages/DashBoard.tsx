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
    console.error('❌ Fallback copy error:', error);
    // Last resort - show prompt for manual copying
    prompt('📋 Copy this link manually (Ctrl+C):', text);
  }
};

const DashBoard = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const contents = useContent();
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  
  const filteredContents = filterType 
    ? contents.filter((content) => content.type === filterType)
    : contents;

  const handleShare = async () => {
    if (isSharing) return; // Prevent multiple clicks
    
    try {
      setIsSharing(true);
      console.log('🔄 Starting brain share process...');
      console.log('🔑 Token:', localStorage.getItem("token"));
      
      const res = await axios.post<ShareLinkResponse>(
        `${BACKEND_URL}/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      
      console.log('✅ Share API response:', res.data);
      const shareUrl = `${window.location.origin}/brain/${res.data.hash}`;
      console.log('🔗 Generated share URL:', shareUrl);
      
      // Try to copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          console.log('✅ Successfully copied to clipboard');
          alert(`${shareUrl}`);
        } catch (clipboardError) {
          console.error('❌ Clipboard copy failed:', clipboardError);
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
    <div className="">
      <SideBar onSelect={setFilterType} selected={filterType} />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border">
        <CreateContent open={modelOpen} onClose={() => setModelOpen(false)} />

        <div className="flex justify-between">
          <div className="text-2xl font-bold text-gray-900">My Brain</div>
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setModelOpen(true)}
              text="Add content"
              variant="primary"
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={handleShare}
              text={isSharing ? "Sharing..." : "Share brain"}
              variant="secondary"
              startIcon={<ShareIcon />}
              disabled={isSharing}
            />
          </div>
        </div>

        {filterType && (
          <div className="text-sm text-gray-500 mt-2">
            Showing only: <strong>{filterType}</strong>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-6">
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