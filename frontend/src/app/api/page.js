"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAccount } from "wagmi";
import { FaCopy } from "react-icons/fa";

export default function ApiRoutePage() {
  const { address, isConnected } = useAccount();
  const [apiKey, setApiKey] = useState("");
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerateApiKey = async () => {
    try {
      setLoading(true); // Start loading

      const response = await fetch("https://blitz-protocol-backend.vercel.app/createUser", {
        method: "POST",
        body: JSON.stringify({ walletAddress: address }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setApiKey(data.apiKey || "your-generated-api-key");
    } catch (error) {
      console.error("Error generating API key:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  if (!mounted) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">API Route Page</h1>

          {isConnected ? (
            <div className="mb-6">
              <p className="text-lg mb-2 text-gray-400">Connected Wallet Address:</p>
              <p className="text-xl font-bold break-words bg-gray-900 p-3 rounded-lg">
                {address}
              </p>
            </div>
          ) : (
            <p className="text-red-500">Please connect your wallet to proceed.</p>
          )}

          <div className="mt-6">
            <button
              onClick={handleGenerateApiKey}
              className={`w-full px-6 py-3 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600 transition`}
              disabled={!isConnected || loading}
            >
              {loading ? 'Generating...' : 'Generate API Key'}
            </button>
          </div>

          {apiKey && (
            <div className="mt-6">
              <p className="text-lg mb-2 text-gray-400">Generated API Key:</p>
              <div className="relative flex items-center bg-gray-900 p-3 rounded-lg">
                <p className="text-xl font-bold break-all mr-8">{apiKey}</p>
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FaCopy />
                </button>
              </div>
              {copied && (
                <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
