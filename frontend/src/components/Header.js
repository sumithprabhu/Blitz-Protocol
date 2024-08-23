import React from "react";
import Image from "next/image"; // Import the Image component
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link"; // Import Link from Next.js

export default function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black border-b-2 border-neon-green relative z-10">
      <Link href="/" passHref>
        <div className="flex items-center">
          <Image
            src="/logo.png" // Path to your logo file in the public directory
            alt="Blitz Protocol Logo"
            width={50} // Set your desired width
            height={50} // Set your desired height
            className="mr-4" // Add some margin to the right
          />
          <span className="text-white text-xl font-bold">Blitz Protocol</span>
        </div>
      </Link>
      <div className="relative">
        {isRootPage ? (
          <a
            href="/playground"
            className="launch-button text-lg relative inline-block text-white font-semibold px-6 py-2 rounded-lg"
          >
            Launch Playground
          </a>
        ) : (
          <ConnectButton
            chainStatus="none"
            label="Connect wallet"
            accountStatus="address"
            showBalance={false}
          />
        )}
      </div>
    </header>
  );
}
