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
const DashBoard = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const contents = useContent();
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredContents = filterType 
    ? contents.filter((content) => content.type === filterType)
    : contents;

  const handleShare = async () => {
    try {
      const res = await axios.post<ShareLinkResponse>(
        `${BACKEND_URL}/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
     
      const shareurl= `${BACKEND_URL}/brain/${res.data.hash}`;
      alert(`${shareurl}`);
    } catch (err) {
      console.error("Share failed", err);
      alert("Something went wrong while sharing.");
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
              text="Share brain"
              variant="secondary"
              startIcon={<ShareIcon />}
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