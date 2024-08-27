"use client"
import React, { useState } from "react";
import ClosedCard from "../../components/closedCard";
import ExpandedCard from "../../components/openedcard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Explore() {
  const [expandedProtocolId, setExpandedProtocolId] = useState(null);

  const handleExpand = (id) => {
    setExpandedProtocolId(id);
  };

  const handleCollapse = () => {
    setExpandedProtocolId(null);
  };
  const dummyProtocols = [
    {
      id: 1,
      name: "Open Campus",
      image: "/profile.jpeg",
      contractAddress: "0xABC123DEF4567890ABC123DEF4567890ABC123D",
    },
    {
      id: 2,
      name: "Dorahacks",
      image: "/profile2.jpeg",
      contractAddress: "0xDEF4567890ABC123DEF4567890ABC123DEF4567",
    },
    {
      id: 3,
      name: "HackQuest",
      image: "/profile4.jpeg",
      contractAddress: "0x1234567890ABCDEF1234567890ABCDEF12345678",
    },
    {
      id: 4,
      name: "Push Protocol",
      image: "/profile2.jpeg",
      contractAddress: "0x4567890ABCDEF1234567890ABCDEF1234567890AB",
    },
    {
      id: 5,
      name: "Ethereum",
      image: "/profile3.jpeg",
      contractAddress: "0x7890ABCDEF1234567890ABCDEF1234567890ABCDEF",
    },
    {
      id: 6,
      name: "Arbitrum",
      image: "/profile4.jpeg",
      contractAddress: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    },
    {
      id: 7,
      name: "Blitz Protocol",
      image: "/profile3.jpeg",
      contractAddress: "0xDEF1234567890ABCDEF1234567890ABCDEF123456",

    },
    {
      id: 8,
      name: "Hackathon Updates",
      image: "/profile.jpeg",
      contractAddress: "0x1234567890ABCDEF1234567890ABCDEF1234567890",
    },
    
  ];
  

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Header />
      <main className={`flex-grow p-6 ${expandedProtocolId ? "blur-md" : ""}`}>
        <h1 className="text-4xl font-bold mb-8 text-center">Explore Blitz</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyProtocols.map((protocol) => (
            <div key={protocol.id} className="col-span-1">
              <ClosedCard protocol={protocol} onExpand={() => handleExpand(protocol.id)} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
      
      {expandedProtocolId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <ExpandedCard
            protocol={dummyProtocols.find((p) => p.id === expandedProtocolId)}
            onCollapse={handleCollapse}
          />
        </div>
      )}
    </div>
  );
}
