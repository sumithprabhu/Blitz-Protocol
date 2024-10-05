"use client";
import Header from "../../components/Header"; // Reuse your current Header component
import Footer from "../../components/Footer"; // Reuse your current Footer component
import animationData from "../../../public/animation-docs.json";
import Lottie from "react-lottie-player";


export default function DocumentationHub() {
  return (
    <div className="bg-[#FEFFDB] text-[#444444] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 bg-[#FFE3B3] text-center relative overflow-hidden">
        <h1 className="text-5xl font-bold mb-4 text-[#444444] mt-[15rem]">
          Blitz Documentation Hub
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-[#444444]">
          Get started with building and integrating native blockchain data
          querying for your protocol!
        </p>
        {/* Button is now above the animation */}
        <button className="relative z-10 bg-[#FF8B00] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#FF8B00] transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer mt-[3rem] mb-[-1rem]">
          Get Started
        </button>

        {/* Animation below the button with reduced opacity */}
        <div className="relative w-full flex justify-center">
          <Lottie
            loop
            animationData={animationData}
            play
            speed={0.5} // Slow down the animation speed (default is 1)
            style={{
              width: 400,
              height: 400,
              margin: "0 auto",
              position: "absolute",
              bottom: "-16rem",
              opacity: 0.4, // Reduced opacity for fading effect
            }}
          />
        </div>
      </section>

      {/* Popular Quickstart */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Popular Quickstart</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-[#FFF1D2] rounded-lg p-6 text-[#444444]">
            <h3 className="text-xl font-bold mb-4">GraphQL Quickstart</h3>
            <pre className="bg-[#FEFFDB] p-4 rounded-lg text-left overflow-x-auto">
              {/* Add your sample GraphQL code snippet */}
            </pre>
          </div>
          <div className="bg-[#FFF1D2] rounded-lg p-6 text-[#444444]">
            <h3 className="text-xl font-bold mb-4">REST API Quickstart</h3>
            <pre className="bg-[#FEFFDB] p-4 rounded-lg text-left overflow-x-auto">
              {/* Add your sample REST API code snippet */}
            </pre>
          </div>
        </div>
      </section>

      {/* Technical Documentation Section */}
      <section className="py-16 bg-[#FFE3B3]">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-[#444444]">
            Technical Documentation
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <a
            href="/graphql"
            className="bg-[#FFF1D2] p-6 rounded-lg hover:bg-[#FEFFDB] transition text-center"
          >
            <h3 className="text-xl font-bold text-[#444444]">GraphQL API</h3>
            <p className="text-[#444444] mt-2">
              Learn how to interact with Blitz using GraphQL.
            </p>
          </a>
          <a
            href="/rest-api"
            className="bg-[#FFF1D2] p-6 rounded-lg hover:bg-[#FEFFDB] transition text-center"
          >
            <h3 className="text-xl font-bold text-[#444444]">
              REST API (Coming Soon)
            </h3>
            <p className="text-[#444444] mt-2">
              Explore RESTful ways to access your data.
            </p>
          </a>
        </div>
      </section>

      {/* SDK Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Blitz SDK</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <a
            href="/sdk-starter-kit"
            className="bg-[#FFF1D2] p-6 rounded-lg hover:bg-[#FEFFDB] transition text-center"
          >
            <h3 className="text-xl font-bold text-[#444444]">
              SDK Starter Kit
            </h3>
          </a>
          <a
            href="/rest-api"
            className="bg-[#FFF1D2] p-6 rounded-lg hover:bg-[#FEFFDB] transition text-center"
          >
            <h3 className="text-xl font-bold text-[#444444]">REST API</h3>
          </a>
          <a
            href="/react-native"
            className="bg-[#FFF1D2] p-6 rounded-lg hover:bg-[#FEFFDB] transition text-center"
          >
            <h3 className="text-xl font-bold text-[#444444]">React Native</h3>
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
