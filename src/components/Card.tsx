import DeleteIcon from "../icons/DeleteIcon";
import MiniXIcon from "../icons/MiniXIcon";
import MiniYoutubeIcon from "../icons/MiniYoutubeIcon";
import { ShareIcon } from "../icons/ShareIcon"
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
    type:"twitter"|"youtube";
    contentId:string;
}

export const Card=({title,link,type,contentId}:CardProps)=>{
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
   await axios.delete<DeleteResponse>(`${BACKEND_URL}/content`, {
  data: { contentId },
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") || "",
  },
} as AxiosRequestConfig);

    alert("Content deleted successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error deleting content", err);
    alert("Failed to delete content.");
  }
};

    return(
        <div className="p-3 bg-white rounded shadow text-left flex flex-col items-start max-w-full">
            <div className="flex justify-between w-full">
                <div className="flex items-center text-md gap-3">
                    <div className="text-gray-500 pr-2">{type==="twitter"?<MiniXIcon/>:<MiniYoutubeIcon/>}</div>
                    <span className="font-semibold">{title}</span>
                </div>               
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank" rel="noopener noreferrer"><ShareIcon/></a>
                    </div>
                    <div onClick={handleDeleteCard} className="text-gray-500 cursor-pointer"> <DeleteIcon/>  </div>
                </div>
            </div>
            <div className="pt-4 w-full text-left">
                {/* Taller aspect ratio and larger min height */}
                <div className="w-full aspect-[16/10] min-h-[350px]">
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
                </div>
            </div>
        </div> 
                
    )
}