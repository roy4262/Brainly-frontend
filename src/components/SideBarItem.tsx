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
      className={`cursor-pointer px-4 py-2 rounded-md mb-1 flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
        selected 
          ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      {text}
    </div>
  );
};
