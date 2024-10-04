import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isOnIt, setIsOnIt] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        setIsScrollingUp(false); // Hide navbar when scrolling down
      } else {
        setIsScrollingUp(true); // Show navbar when scrolling up
      }
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setIsDropdownHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDropdownHovered) {
      setIsDropdownOpen(false);
    } else if (!isOnIt) {
      setTimeout(() => {
        // Code to execute after 1 second (1000 milliseconds)
        setIsDropdownOpen(false); // Example: setting a state or variable
      }, 500);
    }
  };

  const handleDropdownEnter = () => {
    setIsDropdownHovered(true);
    setIsOnIt(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownHovered(false);
    setIsDropdownOpen(false);
    setIsOnIt(false);
  };

  return (
    <header
      className={`${
        isScrollingUp || lastScrollPosition === 0 ? "opacity-100" : "opacity-0"
      } fixed top-7 left-0 right-0 mx-auto px-8 py-4 bg-black bg-opacity-60 rounded-full z-50 transition-opacity duration-500 ease-in-out border-2 border-[#FF8B00]`}
      style={{ maxWidth: "90%", margin: "0 auto" }} // Center the header
    >
      <div className="flex justify-between items-center w-full">
        <Link href="/" legacyBehavior>
          <a className="flex items-center cursor-pointer">
            <Image
              src="/logo.png" // Path to your logo file in the public directory
              alt="Blitz Protocol Logo"
              width={35}
              height={40}
              className="mr-4"
            />
            <span className="text-white text-2xl font-bold">
              Blitz Protocol
            </span>
          </a>
        </Link>

        <div className="relative flex items-center space-x-12">
          {" "}
          {/* Added spacing */}
          {/* Products Dropdown */}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button className="text-white text-lg flex items-center font-semibold">
              Products <FaChevronDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-[#202124] text-white shadow-lg border border-[#C0C0C0] border-opacity-50 rounded-3xl p-6" // Gray background and spacious, rounded corners
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <ul className="space-y-6">
                  <Link href="/explore" legacyBehavior>
                    <li className="flex items-start hover:bg-[#313338] rounded-lg p-3 transition-all cursor-pointer group">
                      {" "}
                      {/* Group added */}
                      <div className="flex-grow">
                        <a className="text-white font-semibold group-hover:text-[#FF8B00]">
                          Blitz Explorer
                        </a>
                        <p className="text-gray-400 text-sm">
                          Explore blockchain with Blitz Protocol.
                        </p>
                      </div>
                    </li>
                  </Link>

                  <Link href="/playground" legacyBehavior>
                    <li className="flex items-start hover:bg-[#313338] rounded-lg p-3 transition-all cursor-pointer group">
                      {" "}
                      {/* Group added */}
                      <div className="flex-grow">
                        <a className="text-white font-semibold group-hover:text-[#FF8B00]">
                          Playground
                        </a>
                        <p className="text-gray-400 text-sm">
                          Interact and build with Blitz Protocol.
                        </p>
                      </div>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
          {/* Docs link */}
          <div>
            <Link href="/docs" legacyBehavior>
              <a className="text-white text-lg font-semibold">Docs</a>
            </Link>
          </div>
          {/* Launch Playground or Connect Wallet */}
          {isRootPage ? (
            <a
              href="/playground"
              className="text-lg inline-block text-white font-semibold px-6 py-2 rounded-lg bg-[#de7800] hover:bg-[#FF8B00] transition-all duration-300"
              style={{ maxWidth: "250px" }}
            >
              Launch Playground
            </a>
          ) : (
            <ConnectButton
              chainStatus="none"
              label="Connect wallet"
              accountStatus="address"
              showBalance={false}
              className="px-6 py-2 rounded-lg border-2 border-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-300"
            />
          )}
        </div>
      </div>
    </header>
  );
}
