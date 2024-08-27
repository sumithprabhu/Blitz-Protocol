"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoOverlay from "../components/VideoOverlay";
import BackgroundFlow from "../components/BackgroundFlow";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleVideoEnd = () => {
    setShowContent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {!showContent && <VideoOverlay onVideoEnd={handleVideoEnd} />}
      {showContent && (
        <>
          <Header />
          <main className="flex-grow flex flex-col justify-center items-center text-center text-white animate-slideIn relative">
            <BackgroundFlow />

            <div className="content-container p-6 md:p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Querying Your Blockchain Data Has Never Been Simpler
              </h2>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                The Blitz Protocol revolutionizes how you interact with
                blockchain data. Whether you&apos;re working with smart contracts or
                needing to query specific data points, Blitz Protocol provides a
                seamless and efficient solution. Tailored for modern
                decentralized applications, Blitz ensures your data is securely
                indexed and quickly retrievable, making it the go-to choice for
                developers and enterprises alike.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
                  <h3 className="text-2xl font-semibold mb-4">Playground</h3>
                  <p className="text-gray-300 mb-6">
                    Test and deploy your smart contracts seamlessly with our
                    intuitive interface. The playground is designed for
                    developers to experiment and refine their contracts.
                  </p>
                  <a
                    href="/playground"
                    className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                  >
                    <span className="mr-2">Launch Playground</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 5l7 7-7 7M5 12h14"
                      />
                    </svg>
                  </a>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
                  <h3 className="text-2xl font-semibold mb-4">Explore</h3>
                  <p className="text-gray-300 mb-6">
                    Browse through various subgraphs and discover the potential
                    of decentralized data querying. Explore the powerful tools
                    Blitz offers to make your data work for you.
                  </p>
                  <a
                    href="/explore"
                    className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                  >
                    <span className="mr-2">Explore Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 5l7 7-7 7M5 12h14"
                      />
                    </svg>
                  </a>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
                  <h3 className="text-2xl font-semibold mb-4">
                    Generate API Key
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Quickly generate an API key to start querying data from the
                    Blitz Protocol. Your gateway to secure and efficient
                    blockchain data access.
                  </p>
                  <br></br>
                  <a
                    href="/api"
                    className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                  >
                    <span className="mr-2">Get Your API Key</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 5l7 7-7 7M5 12h14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
