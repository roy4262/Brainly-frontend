import { Button } from "./Button";
import {InputField} from "./InputField";
import { CrossIcon } from "../icons/CrossIcon";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../Config";

const ContentType =  {
  Youtube: "youtube",
  Twitter: "twitter"
} as const;

type ContentTypeUnion = typeof ContentType[keyof typeof ContentType];

interface CreateContentProps {
  open: boolean;
  onClose: () => void;
}

interface CreateContentResponse {
  message: string;
  contentId: string;
}

export const CreateContent = ({open,onClose}: CreateContentProps) => {
  const titleRef= useRef<HTMLInputElement>(null);
  const linkRef= useRef<HTMLInputElement>(null);
  const [type,setType]=useState<ContentTypeUnion>(ContentType.Youtube);
  const navigate=useNavigate();

  const addContent=async()=>{
      const title=titleRef.current?.value;
      const link=linkRef.current?.value;
                try {
                 const response = await axios.post<CreateContentResponse>(`${BACKEND_URL}/content`, {
                    title,
                    link,
                    type
                    },
                    {
                      headers:{"Authorization":localStorage.getItem("token")
                      }
                    });
                   console.log(response);
                   navigate("/dashboard");  
                   window.location.reload();             
      
            } catch (error:any) {// eslint-disable-line @typescript-eslint/no-explicit-any
                     const errorMsg = error.response?.data?.msg || error.message;
                 alert('Content creation failed: ' + errorMsg);
                }
  }
  return (
    <div>
        {open===true && (
          <>
            {/* Backdrop overlay */}
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>
            
            {/* Content modal */}
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center ">
              <div className="bg-white p-4 rounded-md shadow-lg"> 
                <div className="flex justify-end cursor-pointer"  onClick={onClose}>
                     <CrossIcon/> 
                </div>
                <div>
                     <InputField ref={titleRef} placeholder={"title"} /> 
                      <InputField ref={linkRef} placeholder={"link"}/> 
                </div>
                 <div>
                            {/* <h1>Type</h1> */}
                            <div className="flex gap-5 justify-center pb-2 ">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                            </div>
                        </div>
                <div className="flex justify-center">
                   <Button onClick={async () => { await addContent(); onClose(); }} variant="primary" text="Submit"/>
                </div>
                    
              </div>
            </div>
          </>
        )}
    </div>    
  )
}

