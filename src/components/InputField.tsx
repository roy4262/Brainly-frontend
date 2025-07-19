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
        className="px-4 py-2 border rounded m-2 w-full"
        onChange={onChange}
      />
    </div>
  );
};
