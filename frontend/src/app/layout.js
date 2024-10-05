import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../utils/providers";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blitz Protocol",
  description: "The Future of Blockchain Data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      
      <link rel="icon" href="./favicon.ico" type="image/x-icon" />
    </head>
    <body className={inter.className}>
      <Providers>
      <Toaster position="top-center" reverseOrder={false} />

        {children}
      </Providers>
    </body>
  </html>
  );
}
