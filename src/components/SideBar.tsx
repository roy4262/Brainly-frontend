import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import { SideBarItem } from "./SideBarItem"
import {Docs} from "../icons/Docs"
import { LinkIcon } from "../icons/LinkIcon"
import HashIcon from "../icons/HashIcon"
import { useNavigate } from "react-router-dom"
interface SideBarProps {
  onSelect: (type: string | null) => void;
  selected: string | null;
}

export const SideBar = ({ onSelect, selected }: SideBarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center text-3xl font-bold text-gray-900 pl-12 py-3 border-b border-gray-200">
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/ios/50/brain--v1.png"
            alt="brain--v1"
            className="mr-3"
          />
          Brainly
        </div>
        <div className="pt-6">
          <SideBarItem
            text="All"
            icon={null}
            selected={selected === null}
            onClick={() => {
              onSelect(null);
              window.location.reload();
            }}
          />
          <SideBarItem
            text="Twitter/X"
            icon={<TwitterIcon />}
            selected={selected === "twitter"}
            onClick={() => onSelect("twitter")}
          />
          <SideBarItem
            text="Links"
            icon={<LinkIcon />}
            selected={selected === "link"}
            onClick={() => onSelect("link")}
          />
          <SideBarItem
            text="Docs"
            icon={<Docs />}
            selected={selected === "doc"}
            onClick={() => onSelect("doc")}
          />
          <SideBarItem
            text="Youtube"
            icon={<YoutubeIcon />}
            selected={selected === "youtube"}
            onClick={() => onSelect("youtube")}
          />
          <SideBarItem
            text="HashTags"
            icon={<HashIcon />}
            selected={selected === "hashtag"}
            onClick={() => onSelect("hashtag")}
          />
        </div>
      </div>
      <div className="pb-6 pl-6">
        <button
          onClick={handleLogout}
          className=" text-red-600 text-md  hover:underline cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
