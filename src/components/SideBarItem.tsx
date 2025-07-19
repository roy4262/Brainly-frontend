interface SideBarItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

export const SideBarItem = ({ text, icon, onClick, selected }: SideBarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 rounded-md mb-1 flex items-center gap-2 text-sm font-medium transition ${
        selected ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      {text}
    </div>
  );
};
