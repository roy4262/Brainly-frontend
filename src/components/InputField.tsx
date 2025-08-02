import React from "react";

interface InputFieldProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement>; // ✅ specific type
}

export const InputField = ({
  onChange,
  placeholder,
  type,
  ref,
}: InputFieldProps) => {
  return (
    <div>
      <input
        ref={ref}
        type={type || "text"}
        placeholder={placeholder}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded m-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
        onChange={onChange}
      />
    </div>
  );
};
