import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value} // Adicione esta linha
      onChange={onChange} // Adicione esta linha
      className="bg-gray-200 p-2 rounded w-full"
    />
  );
}