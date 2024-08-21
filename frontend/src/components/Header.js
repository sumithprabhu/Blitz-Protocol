import React from 'react';
import Image from 'next/image'; // Import the Image component
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  const pathname = usePathname();
  const isPlaygroundPage = pathname === '/playground';

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black border-b-2 border-neon-green relative z-10">
      <div className="flex items-center">
        <Image
          src="/logo.png" // Path to your logo file in the public directory
          alt="Blitiz Protocol Logo"
          width={50} // Set your desired width
          height={50} // Set your desired height
          className="mr-4" // Add some margin to the right
        />
        <span className="text-white text-xl font-bold">Blitz Protocol</span>
      </div>
      <div className="relative">
        {isPlaygroundPage ? (
          <ConnectButton chainStatus="none"
          label="Connect wallet"
          accountStatus="address"
          showBalance={false}/>
        ) : (
          <a href="/playground" className="launch-button text-lg relative inline-block text-white font-semibold px-6 py-2 rounded-lg">
            Launch Playground
          </a>
        )}
      </div>
    </header>
  );
}
