import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

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

  return (
    <header
  className={`${
    isScrollingUp || lastScrollPosition === 0 ? "opacity-100" : "opacity-0"
  } fixed top-7 left-0 right-0 mx-auto px-8 py-4 bg-black bg-opacity-70 rounded-full z-50 transition-opacity duration-500 ease-in-out border-2 border-[#FF8B00]`}
  style={{ maxWidth: "90%", margin: "0 auto" }} // Center the header
>
      <div className="flex justify-between items-center w-full">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image
              src="/logo.png" // Path to your logo file in the public directory
              alt="Blitz Protocol Logo"
              width={35}
              height={40}
              className="mr-4"
            />
            <span className="text-white text-2xl font-bold">Blitz Protocol</span>
          </div>
        </Link>

        <div className="relative">
          {isRootPage ? (
            <a
              href="/playground"
              className="text-lg inline-block text-white font-semibold px-6 py-2 rounded-lg border-2 border-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-300" // Neon border and hover effect
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
