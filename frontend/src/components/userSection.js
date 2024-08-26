import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function UserSection({ user }) {
  return (
    <div className="sticky top-0 z-20 w-full bg-gray-900 text-white p-6 shadow-lg rounded-lg my-4">
      <div className="flex flex-wrap justify-between items-start space-y-4 sm:space-y-0">
        {/* Left Section: Profile Picture and Name */}
        <div className="flex flex-col items-center w-full sm:w-1/4 mb-4 sm:mb-0">
          <img
            src={user.profilePic} // Profile picture URL
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <span className="text-lg font-bold text-center">{user.name}</span>
        </div>

        {/* Right Section: Contract Address, API Key, and Query Slug */}
        <div className="flex flex-col w-full sm:w-3/4 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="w-full sm:w-1/2 sm:pr-2">
              <span className="text-sm text-gray-400">Contract Address</span>
              <p className="text-lg font-bold break-all">
                {user.contractAddress}
              </p>
            </div>
            <div className="w-full sm:w-1/2 sm:pl-2">
              <span className="text-sm text-gray-400">API Key</span>
              <a
                href="/api"
                className="text-blue-500 hover:text-blue-700 flex  mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Generate API Key <FaExternalLinkAlt className="ml-2" />
              </a>
            </div>
          </div>
          <div className="w-full">
            <span className="text-sm text-gray-400">Query Slug</span>
            <p className="text-lg font-bold break-all">{user.querySlug}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
