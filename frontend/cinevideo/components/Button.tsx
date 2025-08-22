import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button 
            className="bg-[#FF0000] text-white py-2 px-10 rounded text-lg" 
            onClick={onClick}>
            {children}
        </button>
    );
}