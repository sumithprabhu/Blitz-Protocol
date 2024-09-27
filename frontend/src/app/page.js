"use client";
import Header from "../components/Header"; // Assuming you have the Header component
import Footer from "../components/Footer"; // Assuming you have the Footer component
import Link from "next/link"; // For navigation
import Image from "next/image"; // For images
import animationData from "../../public/animation-home.json";
import Lottie from "react-lottie-player";
import animationDataLive from "../../public/animation-live.json";

export default function HeroSection() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Include the Header */}
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between">
        {/* Upper Section (Text and Animation) */}
        <div
          className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 md:px-12"
          style={{ marginTop: "15rem" }}
        >
          {/* Text Section */}
          <div className="md:w-1/2">
            <div
              className="bg-[#2a2a2a] text-white py-1 px-3 mb-4 rounded-xl flex items-center border border-[#C0C0C0] shadow-lg"
              style={{ maxWidth: "80%" }}
            >
              <Lottie
                loop
                animationData={animationDataLive}
                play
                speed={0.5}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: "-2rem",
                  marginBottom: "-5rem",
                  marginLeft: "-3rem",
                  marginRight: "-2rem",
                }}
              />
              <span className="text-md">
                Blitz Protocol is Now Live on EDU Chain Testnet
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 mt-[2rem]">
              The Future of Blockchain Data
            </h1>
            <p className="text-xl text-[#FEFFDB] mb-6">
              Blitz Protocol is designed to make querying blockchain data
              faster, simpler, and more efficient. Power your decentralized
              applications with secure, indexed, and easily retrievable data.
            </p>
            <Link href="/docs">
              <button className="bg-[#de7800] text-white font-bold py-3 px-8 rounded-lg mt-[1rem] transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">
                Start Building
              </button>
            </Link>
          </div>

          {/* Graphic Section */}
          <div className="md:w-1/2 relative mt-10 md:mt-0 ml[2rem]">
            {/* Placeholder for image */}
            <Lottie
              loop
              animationData={animationData}
              play
              speed={0.7}
              style={{
                width: 600,
                height: 600,
                margin: "0 auto",
                position: "absolute",
                bottom: "-16rem",
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="bg-black text-white py-8 border border-[#FF8B00] border-opacity-60 shadow-lg mx-auto mt-[1rem] rounded-3xl"
          style={{ minWidth: "70%", marginBottom: "2rem" }}
        >
          <div className="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">100+</h3>
              <p className="text-[#FEFFDB]">Data Queries Processed</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">10+</h3>
              <p className="text-[#FEFFDB]">Total Contracts Indexed</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">10+</h3>
              <p className="text-[#FEFFDB]">Blitz Created</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">30+</h3>
              <p className="text-[#FEFFDB]">Blockchain Events Indexed</p>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto text-center mb-8 mt-[7rem]">
          <h2 className="text-4xl font-bold mb-6">
            Unlock the Potential of Every Utility
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Blitz Protocol is designed to empower decentralized applications
            across a wide range of utilities. From DAOs to Gaming, NFT to
            Infrastructure, we provide the best tools to interact with your data
            efficiently.
          </p>
        </div>

        <div
          className="relative overflow-hidden h-12 mx-auto opacity-40 mt-[1rem]"
          style={{ maxWidth: "80%" }}
        >
          <div className="flex animate-carousel whitespace-nowrap justify-center">
            {/* Words and SVG */}
            {[
              "DAO",
              "Gaming",
              "NFT",
              "Infrastructure",
              "Social",
              "DeFi",
              "Governance",
              "Education",
              "Marketplace",
              "DAO",
              "Gaming",
              "NFT",
              "Infrastructure",
              "Social",
              "DeFi",
              "Governance",
              "Education",
              "Marketplace",
              "DAO",
              "Gaming",
              "NFT",
              "Infrastructure",
              "Social",
              "DeFi",
              "Governance",
              "Education",
              "Marketplace",
            ].map((word, idx) => (
              <span key={idx} className="flex items-center mx-6">
                <span className="font-extrabold text-2xl">{word}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                  className="mx-6"
                >
                  <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
                </svg>
              </span>
            ))}
            {/* Repeat the words for a continuous effect */}
            {[
              "DAO",
              "Gaming",
              "NFT",
              "Infrastructure",
              "Social",
              "DeFi",
              "Governance",
              "Education",
              "Marketplace",
              "DAO",
              "Gaming",
              "NFT",
              "Infrastructure",
              "Social",
              "DeFi",
              "Governance",
              "Education",
              "Marketplace",
              "DAO",
              "Gaming",
              "NFT",
              "Infrastructure",
              "Social",
              "DeFi",
              "Governance",
              "Education",
              "Marketplace",
            ].map((word, idx) => (
              <span key={idx + 9} className="flex items-center mx-6">
                <span className="font-extrabold text-2xl">{word}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                  className="mx-6"
                >
                  <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* Tailwind CSS for carousel animation */}
        <style jsx>{`
          .animate-carousel {
            animation: scroll-carousel 15s linear infinite;
          }

          @keyframes scroll-carousel {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-[5rem] text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Optimized for Efficiency
            </h3>
            <p className="text-gray-400">
              Whether you're building a DAO, managing NFT collections, or
              scaling infrastructure, Blitz Protocol makes querying blockchain
              data fast, simple, and reliable.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Built for All Developers
            </h3>
            <p className="text-gray-400">
              From small teams to large-scale projects, our flexible tools and
              reliable indexing make Blitz Protocol a perfect choice for all
              types of decentralized applications.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Scalable for Every Use Case
            </h3>
            <p className="text-gray-400">
              Blitz Protocol is built to handle the most demanding use cases
              across gaming, infrastructure, and more, ensuring consistency and
              performance every time.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Secure and Durable</h3>
            <p className="text-gray-400">
              Your data is stored securely and indexed with durability in mind,
              providing support for reorganizations and global replication.
            </p>
          </div>
        </div>
      </section>

      {/* Include the Footer */}
      <Footer />
    </div>
  );
}
