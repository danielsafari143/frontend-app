import React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}
      {...props}
    />
  );
}

export default Card; 