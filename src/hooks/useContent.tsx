import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../Config";

interface ContentItem {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document";
    contentId: string;
    filename?: string; // For document files
}

interface ContentResponse {
    content: ContentItem[];
}

export const useContent = () => {
    const [Contents, setContents] = useState<ContentItem[]>([]);
    useEffect(() => {
        axios.get<ContentResponse>(`${BACKEND_URL}/content`, {
            headers: { "Authorization": localStorage.getItem("token") }
        })
        .then((res) => setContents(res.data.content))
        
    },[]);
   //  console.log(Contents);
    return Contents || []; 
  }