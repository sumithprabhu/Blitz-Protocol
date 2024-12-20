"use client";
import Header from "../components/Header"; // Assuming you have the Header component
import Footer from "../components/Footer"; // Assuming you have the Footer component
import Link from "next/link"; // For navigation
import Image from "next/image"; // For images
import animationData from "../../public/animation-home.json";
import Lottie from "react-lottie-player";
import animationDataLive from "../../public/animation-live.json";
import { useState } from "react";

export default function HeroSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? -1 : index); // Toggle logic
  };

  const faqs = [
    {
      question: "What is Blitz Protocol?",
      answer:
        "Blitz Protocol is a blockchain indexing and querying solution that simplifies data retrieval for decentralized applications. It enables fast, secure, and efficient querying of blockchain data across multiple use cases.",
    },
    {
      question: "How does Blitz Protocol enhance dApp performance?",
      answer:
        "Blitz Protocol enhances performance by providing decentralized applications (dApps) with access to indexed blockchain data. This eliminates the need for custom backend systems and makes data retrieval faster and more efficient.",
    },
    {
      question: "Is Blitz Protocol available for public use?",
      answer:
        "Yes, Blitz Protocol is available on the EDU Chain Testnet, and it will soon be launching on mainnet. Developers can start building and testing on the testnet version.",
    },
    {
      question: "How can I integrate Blitz Protocol with my dApp?",
      answer:
        "Blitz Protocol provides a simple integration process. You can use our GraphQL or REST API to fetch data from the blockchain and connect it to your decentralized application. Detailed documentation is available on our developer portal.",
    },
    {
      question: "What industries or use cases does Blitz Protocol support?",
      answer:
        "Blitz Protocol is built to support industries such as DeFi, gaming, NFT marketplaces, DAOs, and infrastructure applications. It is scalable and designed to handle demanding use cases across multiple sectors.",
    },
    {
      question: "What is the cost of using Blitz Protocol?",
      answer:
        "Blitz Protocol is currently free to use during its testnet phase. Upon mainnet launch, a tiered pricing structure will be introduced based on the number of queries and resources consumed.",
    },
    {
      question: "Is Blitz Protocol decentralized?",
      answer:
        "Yes, Blitz Protocol is decentralized by design. It utilizes multiple indexing nodes that work together to ensure that data is fetched, indexed, and queried in a secure and decentralized manner.",
    },
  ];

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
              <h3 className="text-4xl font-bold">5000+</h3>
              <p className="text-[#FEFFDB]">Data Queries Processed</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-[#FEFFDB]">Total Contracts Indexed</p>
            </div>
            <div className="text-center mb-6 md:mb-0">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-[#FEFFDB]">Blitz Created</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold">200+</h3>
              <p className="text-[#FEFFDB]">Blockchain Events Indexed</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-800 pt-6 "></div>

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
          {/* Box 1 */}
          <div className="relative group bg-transparent rounded-3xl p-8 transition-all duration-300 ease-in-out shadow-[0_0_15px_#FF8B00] hover:shadow-[0_0_25px_#FF8B00]">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Optimized for Efficiency
            </h3>
            <p className="text-gray-400">
              Whether you`&apos;`re building a DAO, managing NFT collections, or
              scaling infrastructure, Blitz Protocol makes querying blockchain
              data fast, simple, and reliable.
            </p>
          </div>

          {/* Box 2 */}
          <div className="relative group bg-transparent  rounded-3xl p-8 transition-all duration-300 ease-in-out shadow-[0_0_15px_#FF8B00] hover:shadow-[0_0_25px_#FF8B00]">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Built for All Developers
            </h3>
            <p className="text-gray-400">
              From small teams to large-scale projects, our flexible tools and
              reliable indexing make Blitz Protocol a perfect choice for all
              types of decentralized applications.
            </p>
          </div>

          {/* Box 3 */}
          <div className="relative group bg-transparent rounded-3xl p-8 transition-all duration-300 ease-in-out shadow-[0_0_15px_#FF8B00] hover:shadow-[0_0_25px_#FF8B00]">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Scalable for Every Use Case
            </h3>
            <p className="text-gray-400">
              Blitz Protocol is built to handle the most demanding use cases
              across gaming, infrastructure, and more, ensuring consistency and
              performance every time.
            </p>
          </div>

          {/* Box 4 */}
          <div className="relative group bg-transparent rounded-3xl p-8 transition-all duration-300 ease-in-out shadow-[0_0_15px_#FF8B00] hover:shadow-[0_0_25px_#FF8B00]">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Secure and Durable
            </h3>
            <p className="text-gray-400">
              Your data is stored securely and indexed with durability in mind,
              providing support for reorganizations and global replication.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-800 pt-6 "></div>

      <section className="max-w-7xl mx-auto py-16 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <a
              href="https://t.me/blitzprotocol"
              className="inline-block bg-[#de7800] text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              Join us on Telegram →
            </a>
          </div>
          <div className="md:w-2/3 space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-600">
                <div
                  className="flex justify-between items-center cursor-pointer py-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-3xl">{faq.question}</h3>
                  <span>{openIndex === index ? "−" : "+"}</span>
                </div>
                {openIndex === index && (
                  <div className="text-gray-400 pb-4 transition-opacity duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-800 pt-6 "></div>

      <section className="relative flex flex-col items-center justify-center h-[54rem]">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40 z-0"
          style={{
            backgroundImage: `url('/home-bottom-background.svg')`, // Assuming the SVG is in the public folder
          }}
        ></div>

        {/* Logo behind text */}
        <div className="absolute inset-0 flex justify-center items-center mt-[-19rem] z-10">
          <img
            src="/logo.png" // Path to your logo image in the public folder
            alt="Blitz Protocol Logo"
            className="opacity-30 h-[auto] w-[20%]" // Setting logo size here
          />
        </div>

        {/* Text and button */}
        <div className="relative z-20 text-center text-white mt-[-17rem]">
          <h2 className="text-4xl font-bold mb-4">
            Empower your dApp with seamless integration.
          </h2>
          <p className="text-lg mb-6">
            Unlock the full potential of dApps with Blitz Protocol, enabling
            smooth and efficient data access.
          </p>
          <button className="bg-[#de7800] text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110">
            Start Building
          </button>
        </div>
      </section>

      {/* Include the Footer */}
      <Footer />
    </div>
  );
}
