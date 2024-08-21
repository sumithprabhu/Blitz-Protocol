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

                  <div className="content-container p-6 md:p-12">
                    <h2 className="text-4xl font-bold mb-6">
                      Indexing and Querying for Open Campus Blockchain
                    </h2>
                    <p className="text-lg max-w-2xl">
                      The Blitiz Protocol offers advanced indexing and querying
                      capabilities tailored for the Open Campus blockchain,
                      ensuring that your data is efficiently stored, retrieved,
                      and managed.
                    </p>
                  </div>
                </main>
                <Footer />
              </>
            )}
          </div>
  );
}
