import React from "react";

interface CapabilityCircleProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function CapabilityCircle({ title, children, className }: CapabilityCircleProps) {
  return (
    <div className={className}>
      <span className="text-gray-500 title_1 mb-4">{title}</span>
      <div className="size-[380px] bg-gray-100 rounded-full shadow-md flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}