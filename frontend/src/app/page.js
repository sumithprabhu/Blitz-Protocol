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
  <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 md:px-12" style={{ marginTop: '15rem' }}>
    {/* Text Section */}
    <div className="md:w-1/2">
      <div className="bg-[#2a2a2a] text-white py-1 px-3 mb-4 rounded-xl flex items-center border border-[#C0C0C0] shadow-lg" style={{ maxWidth: '80%' }}>
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
        Blitz Protocol is designed to make querying blockchain data faster,
        simpler, and more efficient. Power your decentralized applications
        with secure, indexed, and easily retrievable data.
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
  <div className="bg-black text-white py-8 border border-[#FF8B00] border-opacity-60 shadow-lg mx-auto mt-[1rem] rounded-3xl" style={{ minWidth: '70%', marginBottom: '2rem' }}>
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


      {/* Include the Footer */}
      <Footer />
    </div>
  );
}
