import React from "react";

interface AuthContainerProps {
  children: React.ReactNode;
}

export default function AutoContainer({ children }: AuthContainerProps) {
  return (
    <div className="bg-[#E36161] p-10 rounded-lg w-96">
        {children}
    </div>
  );
}