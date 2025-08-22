import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`bg-red-500 text-white p-3 rounded w-full text-lg ${className}`} // Usando o className da prop
      >
        {children}
      </button>
    );
  }