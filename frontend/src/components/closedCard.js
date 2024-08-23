import React from "react";

export default function ClosedCard({ protocol, onExpand }) {
  return (
    <div
      className="w-full h-64 bg-gray-800 rounded-lg shadow-lg flex flex-col cursor-pointer"
      onClick={() => onExpand(protocol.id)}
    >
      <div className="w-full h-3/4 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${protocol.image})` }}>
        {/* Image */}
      </div>
      <div className="w-full h-1/4 flex items-center justify-center">
        <span className="text-white text-lg font-bold">{protocol.name}</span>
      </div>
    </div>
  );
}
