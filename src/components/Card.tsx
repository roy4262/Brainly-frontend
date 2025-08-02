import DeleteIcon from "../icons/DeleteIcon";
import MiniXIcon from "../icons/MiniXIcon";
import MiniYoutubeIcon from "../icons/MiniYoutubeIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Docs } from "../icons/Docs";
import { LinkIcon } from "../icons/LinkIcon";
import { useEffect } from "react"
import axios from "axios";

type AxiosRequestConfig = Parameters<typeof axios.delete>[1];
import { BACKEND_URL } from "../Config";



interface DeleteResponse {
     success: boolean;
}
interface CardProps{
    title:string;
    link:string;
    type:"twitter"|"youtube"|"document"|"link";
    contentId:string;
    isSharedView?: boolean; // New prop to indicate if this is a shared view
}

// Helper function to get the correct download URL for documents
const getDownloadUrl = (link: string, type: string) => {
    if (type === "document") {
        // Extract filename from the link (handle both localhost and production URLs)
        const filename = link.split('/').pop();
        return `${BACKEND_URL}/file/${filename}`;
    }
    return link;
};

export const Card=({title,link,type,contentId,isSharedView = false}:CardProps)=>{
    console.log(`🎴 Card rendering:`, { title, link, type, contentId, isSharedView });
    
    // Get the correct URL for downloads
    const downloadUrl = getDownloadUrl(link, type);
    useEffect(() => {
        if (type === "twitter" && !document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.charset = 'utf-8';
            document.body.appendChild(script);
        }
    }, [type]);

// const config: AxiosRequestConfig = {
//   data: { contentId } // your payload
// };

const handleDeleteCard = async () => {
  try {
    console.log('Attempting to delete content with ID:', contentId);
    console.log('Token:', localStorage.getItem("token"));
    
    const response = await axios.delete<DeleteResponse>(`${BACKEND_URL}/content`, {
      data: { contentId },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    } as AxiosRequestConfig);

    console.log('Delete response:', response.data);
    alert("Content deleted successfully!");
    window.location.reload();
  } catch (err: any) {
    console.error("Error deleting content", err);
    console.error("Error response:", err.response?.data);
    console.error("Error status:", err.response?.status);
    
    const errorMsg = err.response?.data?.msg || err.message || "Unknown error";
    alert(`Failed to delete content: ${errorMsg}`);
  }
};

    return(
        <div className="p-3 bg-white rounded shadow text-left flex flex-col items-start max-w-full">
            <div className="flex justify-between w-full">
                <div className="flex items-center text-sm sm:text-md gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="text-gray-500 flex-shrink-0">
                        {type === "twitter" ? <MiniXIcon/> : 
                         type === "youtube" ? <MiniYoutubeIcon/> : 
                         type === "link" ? <LinkIcon/> :
                         <Docs/>}
                    </div>
                    <span className="font-semibold truncate">{title}</span>
                </div>               
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <div className="text-gray-500">
                        {type === "document" ? (
                            <a href={downloadUrl} download><ShareIcon/></a>
                        ) : (
                            <a href={link} target="_blank" rel="noopener noreferrer"><ShareIcon/></a>
                        )}
                    </div>
                    {!isSharedView && (
                        <div onClick={handleDeleteCard} className="text-gray-500 cursor-pointer"> <DeleteIcon/>  </div>
                    )}
                </div>
            </div>
            <div className="pt-4 w-full text-left">
                {/* Responsive aspect ratio and min height */}
                <div className="w-full aspect-[16/10] min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]">
                    {type === "youtube" && (
                        <iframe
                            className="w-full h-full"
                            src={link.replace("watch", "embed").replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <div className="w-full h-full flex justify-start overflow-hidden">
                            <blockquote
                                className="twitter-tweet w-full h-full m-0"
                                style={{ minWidth: 0, minHeight: 0, width: "100%", height: "100%" }}
                            >
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )}

                    {type === "document" && (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <Docs />
                            <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">Document: {title}</p>
                            <a 
                                href={downloadUrl} 
                                download
                                className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                            >
                                Download PDF
                            </a>
                        </div>
                    )}

                    {type === "link" && (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <LinkIcon />
                            <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">Link: {title}</p>
                            <a 
                                href={link.startsWith('http') ? link : `https://${link}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                            >
                                Visit Link
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div> 
                
    )
}