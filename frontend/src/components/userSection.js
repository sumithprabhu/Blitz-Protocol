import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function UserSection({ user }) {
  return (
    <div
      className="sticky top-0 z-20 w-[85%] p-6 shadow-lg rounded-3xl my-4 mx-auto mt-[3rem]"
      style={{
        backgroundColor: "#202124", // Gradient background
        border: "1px solid #FF8B00", // Orange border to highlight section
      }}
    >
      <div className="flex flex-wrap justify-between items-start space-y-4 sm:space-y-0">
        {/* Left Section: Profile Picture and Name */}
        <div className="flex flex-col items-center w-full sm:w-1/4 mb-4 sm:mb-0">
          <img
            src={user.profilePic} // Profile picture URL
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-4 border-[#FF8B00]" // Add orange border to image
          />
          <span className="text-lg font-bold text-center text-white">
            {user.name}
          </span>
        </div>

        {/* Right Section: Contract Address, API Key, and Query Slug */}
        <div className="flex flex-col w-full sm:w-3/4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="w-full sm:w-1/2 sm:pr-2">
              <span className="text-sm text-gray-400">Contract Address</span>
              <p className="text-lg font-bold text-white break-all">
                {user.contractAddress}
              </p>
            </div>
            <div className="w-full sm:w-1/2 sm:pl-2">
              <span className="text-sm text-gray-400">API Key</span>
              <a
                href="/api"
                className="text-[#FF8B00] hover:text-orange-500 flex mt-1" // Change link color to orange
                target="_blank"
                rel="noopener noreferrer"
              >
                Generate API Key <FaExternalLinkAlt className="ml-2" />
              </a>
            </div>
          </div>
          <div className="w-full">
            <span className="text-sm text-gray-400">Query Slug</span>
            <p className="text-lg font-bold text-white break-all">
              {user.querySlug}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
