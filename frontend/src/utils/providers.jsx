'use client'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,lightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider ,http} from 'wagmi';

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import * as React from 'react';

const OpenCampus = {
    id: 656476,
    name: "Open Campus",
    iconUrl:
      "https://www.opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
    iconBackground: "#fff",
    nativeCurrency: { name: "Open Campus", symbol: "EDU", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://rpc.open-campus-codex.gelato.digital/"] },
    },
    blockExplorers: {
      default: {
        name: "Blockscout",
        url: "https://opencampus-codex.blockscout.com/",
      },
    },
  };

const config = getDefaultConfig({
    appName: "Blitz",
    projectId: "d9a0a754111f41404d4e99cb91f32b3d",
  chains: [OpenCampus],
  transports: {
    [OpenCampus.id]: http('https://lb.drpc.org/ogrpc?network=open-campus-codex-sepolia&dkey=AnA59SV95kZ5lihvs8EOYhgim-29f7QR75SQhlDYfw4q')
  }
});

const queryClient = new QueryClient();



const Providers = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#FF8B00",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "none",
        })}
      >
        {children}
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;