"use client";
import React, { useState, useEffect } from "react";
import ClosedCard from "../../components/closedCard";
import ExpandedCard from "../../components/openedcard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaSearch } from "react-icons/fa"; // Added Search Icon
import axios from "axios";

export default function Explore() {
  const [expandedProtocolId, setExpandedProtocolId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category state
  const [blitz, setBlitz] = useState([]); // Protocols state
  const [loading, setLoading] = useState(true);

  const handleExpand = (id) => {
    setExpandedProtocolId(id);
  };

  const handleCollapse = () => {
    setExpandedProtocolId(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  async function fetchBlitzDataFromBackend() {
    try {
      // Fetch data from the backend using the provided _id
      const response = await axios.get(
        `https://blitz-protocol-backend.vercel.app/blitz`
      );

      // The response contains the specific Blitz data
      const blitzData = response.data;

      return blitzData; // Return the data for further use
    } catch (error) {
      console.error("Error fetching Blitz data:", error);
      return null; // Return null in case of error
    }
  }

  useEffect(() => {
    const fetchBlitzData = async () => {
      const blitzData = await fetchBlitzDataFromBackend();
      if (blitzData) {
        setBlitz(blitzData); // Set the Blitz data once it is fetched
        console.log(blitzData);
      }
      setLoading(false);
    };

    fetchBlitzData();
  }, []);
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

  const categories = [
    "All",
    "DAO",
    "DeFi",
    "Gaming",
    "Infrastructure",
    "Media",
    "Metaverse",
    "Service",
    "Social",
    "Tooling",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Header />

      <main
        className={`flex-grow p-6 mt-[10rem] ${
          expandedProtocolId ? "blur-md" : ""
        }`}
      >
        <div className="max-w-[70%] mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Explore Blitz</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6 relative mx-auto max-w-[85%]">
            <input
              type="text"
              placeholder="Search Protocol Name or Contract Address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 text-white placeholder-gray-400 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              style={{ caretColor: "white" }} // Ensures the cursor is visible
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500" />
          </div>

          {/* Categories Row */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category
                      ? "bg-orange-500 text-white border-orange-600"
                      : "bg-black text-white border-gray-700"
                  } hover:bg-orange-400 hover:text-white transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Protocol Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blitz.map((protocol) => (
              <div key={protocol._id} className="col-span-1">
                <ClosedCard
                  protocol={protocol}
                  onExpand={() => handleExpand(protocol._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {expandedProtocolId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <ExpandedCard
            protocol={blitz.find((p) => p._id === expandedProtocolId)}
            onCollapse={handleCollapse}
          />
        </div>
      )}
    </div>
  );
}
