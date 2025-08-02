import { Button } from "./Button";
import {InputField} from "./InputField";
import { CrossIcon } from "../icons/CrossIcon";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../Config";

const ContentType =  {
  Youtube: "youtube",
  Twitter: "twitter",
  Document: "document",
  Link: "link"
} as const;

type ContentTypeUnion = typeof ContentType[keyof typeof ContentType];

interface CreateContentProps {
  open: boolean;
  onClose: () => void;
}

interface CreateContentResponse {
  msg: string;
  content?: any;
  filename?: string;
}

export const CreateContent = ({open,onClose}: CreateContentProps) => {
  const titleRef= useRef<HTMLInputElement>(null);
  const linkRef= useRef<HTMLInputElement>(null);
  const fileRef= useRef<HTMLInputElement>(null);
  const [type,setType]=useState<ContentTypeUnion>(ContentType.Youtube);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate=useNavigate();

  const addContent=async()=>{
      const title=titleRef.current?.value;
      const link=linkRef.current?.value;
      
      // Validation
      if (!title?.trim()) {
        alert('Please enter a title');
        return;
      }
      
      if (type !== ContentType.Document && !link?.trim()) {
        alert('Please enter a link for YouTube/Twitter/Link content');
        return;
      }
      
      // Validate YouTube links
      if (type === ContentType.Youtube && link?.trim()) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        if (!youtubeRegex.test(link.trim())) {
          alert('Please enter a valid YouTube URL');
          return;
        }
      }
      
      // Validate Twitter links
      if (type === ContentType.Twitter && link?.trim()) {
        const twitterRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+/;
        if (!twitterRegex.test(link.trim())) {
          alert('Please enter a valid Twitter/X URL');
          return;
        }
      }
      
      // No validation for general links - accept any input
      
      const token = localStorage.getItem("token");
      if (!token) {
        alert('Please log in first');
        navigate("/signin");
        return;
      }
      
      try {
        if (type === ContentType.Document) {
          // Handle file upload
          if (!selectedFile) {
            alert('Please select a file to upload');
            return;
          }
          
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('title', title.trim());
          formData.append('type', type);
          
          await axios.post<CreateContentResponse>(`${BACKEND_URL}/upload`, formData, {
            headers: {
              "Authorization": token
              // Don't set Content-Type for FormData - let browser set it with boundary
            }
          });
        } else {
          // Handle regular content (YouTube, Twitter)
          await axios.post<CreateContentResponse>(`${BACKEND_URL}/content`, {
            title: title.trim(),
            link: link?.trim(),
            type
          }, {
            headers: {"Authorization": token}
          });
        }
        
        // Success - close modal and refresh
        alert('Content created successfully!');
        onClose(); // Close the modal first
        navigate("/dashboard");  
        window.location.reload();             
      
      } catch (error:any) {// eslint-disable-line @typescript-eslint/no-explicit-any
        
        let errorMsg = 'Content creation failed';
        
        if (error.response?.status === 401) {
          errorMsg = 'Please log in again';
          localStorage.removeItem("token");
          navigate("/signin");
          return;
        } else if (error.response?.status === 403) {
          errorMsg = 'Invalid or expired token. Please log in again';
          localStorage.removeItem("token");
          navigate("/signin");
          return;
        } else if (error.response?.data?.msg) {
          errorMsg = error.response.data.msg;
        } else if (error.message) {
          errorMsg = error.message;
        }
        
        alert(errorMsg);
      }
  }
  return (
    <div>
        {open===true && (
          <>
            {/* Backdrop overlay */}
            <div className="w-screen h-screen bg-slate-500 dark:bg-slate-800 fixed top-0 left-0 opacity-60 dark:opacity-70 z-50 transition-colors duration-300"></div>
            
            {/* Content modal */}
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md max-h-full overflow-y-auto transition-colors duration-300"> 
                <div className="flex justify-end cursor-pointer"  onClick={onClose}>
                     <CrossIcon/> 
                </div>
                <div>
                     <InputField ref={titleRef} placeholder={"title"} /> 
                     {type !== ContentType.Document ? (
                       <InputField ref={linkRef} placeholder={
                         type === ContentType.Youtube ? "YouTube URL" :
                         type === ContentType.Twitter ? "Twitter/X URL" :
                         type === ContentType.Link ? "Website URL" :
                         "link"
                       }/> 
                     ) : (
                       <div className="mb-4">
                         <input
                           ref={fileRef}
                           type="file"
                           accept=".pdf,.doc,.docx"
                           onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                           className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                         />
                         {selectedFile && (
                           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
                             Selected: {selectedFile.name}
                           </p>
                         )}
                       </div>
                     )}
                </div>
                 <div>
                            {/* <h1>Type</h1> */}
                            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3 justify-center pb-2">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }} className="text-sm"></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }} className="text-sm"></Button>
                                <Button text="Link" variant={type === ContentType.Link ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Link)
                                }} className="text-sm"></Button>
                                <Button text="Document" variant={type === ContentType.Document ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Document)
                                }} className="text-sm"></Button>
                            </div>
                        </div>
                <div className="flex justify-center">
                   <Button onClick={addContent} variant="primary" text="Submit"/>
                </div>
                    
              </div>
            </div>
          </>
        )}
    </div>    
  )
}

