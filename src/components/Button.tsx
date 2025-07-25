import type { ReactElement } from "react";

interface ButtonProps{
    variant:"primary" | "secondary";
    text:string;
    startIcon?:ReactElement;
    onClick?:()=> void;
    fullWidth?:boolean;
    loading?:boolean;
 
}

const variants={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}

const defaultstyles="px-4 py-2 rounded-md font-light flex items-center cursor-pointer"
//items-center is used to align the items in center vertically
//justify-center is used for horizontal

export const Button = ({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps) =>{
     return(
       <button 
         onClick={onClick} 
         className={`${variants[variant]} ${defaultstyles}${fullWidth ? " w-full justify-center" : ""}${loading ? " opacity-50 cursor-not-allowed" : ""}`} 
      
       >
         {startIcon && (
           <div className="pr-2">
             {startIcon}
           </div>
         )}
         {text}
       </button>
     )
}
