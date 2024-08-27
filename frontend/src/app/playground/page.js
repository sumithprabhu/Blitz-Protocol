"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserSection from "../../components/userSection";
import Lottie from "react-lottie-player";
import animationData from "../../../public/animation.json"; // Adjust path as necessary
import axios from "axios"; // Axios is commonly used for HTTP requests
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import contract_ABI from "../../constants/contract_abi.js"; // Import the contract ABI from the contract file

export default function Playground() {
  const [step, setStep] = useState(1);
  const [protocolName, setProtocolName] = useState("");
  const [protocolImage, setProtocolImage] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractABI, setContractABI] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const { address } = useAccount();
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const [queryText, setQueryText] = useState(`{
    contract {
        _id
        events {
            eventName
            instances {
                timestamp
                data
            }
        }
    }
}`);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setIsLoading(true);
      const messages = [
        "Initializing transaction.",
        "Verfying Blitz details",
        "Creating Blitz",
        "Finalising transaction",
      ];

      const totalDuration = 30000; // 30 seconds
      const interval = totalDuration / messages.length; // Time each message stays on screen

      messages.forEach((message, index) => {
        setTimeout(() => {
          setLoadingMessage(message);
        }, index * interval);
      });

      setTimeout(() => {
        setIsLoading(false);
        setStep(4);
      }, totalDuration);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProtocolImage(
      "https://github.com/sumithprabhu/Blitz-Protocol/blob/main/frontend/public/profile.jpeg?raw=true"
    );
  };

  const handleQuery = async () => {
    try {
      // Construct the API endpoint using the contract address
      const apiUrl = `https://blitz-protocol-backend.vercel.app/api/6575d87b0983efec7d2a6f32b150e2d2/${contractAddress}`;

      // Fetch data from the API using the queryText state
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryText,
        }),
      });

      // Parse the response
      const data = await response.json();

      // Set the query result to display it
      setQueryResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error running query:", error);
      setQueryResult("Error running query.");
    }
  };

  const handleInitiateTransaction = async () => {
    try {
      handleNextStep();
      const count = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contract_ABI,
        chainId: 656476,
        functionName: "createBlitz",
        args: [address],
      });
      console.log(count);
      console.log("Transaction initiated successfully");
      // Prepare the payload
      let parsedABI;
    try {
      parsedABI = JSON.parse(contractABI);
    } catch (error) {
      console.error("Error parsing contract ABI:", error);
      return;
    }
    
      const payload = {
        contractAddress,
        contractABI: parsedABI,
        protocolName,
        imageUrl: protocolImage, // Replace 'default-image-url' with an appropriate placeholder if needed
      };

      console.log("Payload:", payload);

      // Make the POST request to the backend
      const response = await axios.post(
        `https://blitz-protocol-backend.vercel.app/register`,
        payload
      );

      // Handle the response from the backend
      if (response.status === 200) {
        console.log("Protocol registered successfully:", response.data);
        // You can update the state or trigger any success behavior here
      } else {
        console.error("Failed to register protocol:", response.data);
        // Handle failure case (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error("An error occurred during the transaction:", error);
      // Handle error case (e.g., show an error message to the user)
    }
  };

  const user = {
    profilePic: "/profile.jpeg", // Display uploaded image or default
    name: protocolName || "Blitz Protocol",
    contractAddress: contractAddress || "0x1234",
    querySlug: `https://blitz-protocol-backend.vercel.app/api/{API_KEY}/${contractAddress}`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <UserSection user={user} />

      <main className="flex-grow flex flex-col justify-center items-center text-center p-4 relative">
        {step === 1 && (
          <div className="w-full max-w-3xl p-12 bg-gray-800 rounded-lg shadow-lg mx-4">
            <h1 className="text-3xl font-bold mb-6">Enter Protocol Details</h1>
            <input
              type="text"
              placeholder="Protocol Name"
              value={protocolName}
              onChange={(e) => setProtocolName(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600"
            />
            <button
              onClick={handleNextStep}
              className="px-8 py-4 bg-green-500 text-black rounded hover:bg-green-600 transition"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-3xl p-12 bg-gray-800 rounded-lg shadow-lg mx-4">
            <h1 className="text-3xl font-bold mb-6">Enter Contract Details</h1>
            <input
              type="text"
              placeholder="Contract Address"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600"
            />
            <textarea
              placeholder="Contract ABI"
              value={contractABI}
              onChange={(e) => {
                setContractABI(e.target.value);
                console.log(e.target.value); // Check if the entire content is captured
              }}
              className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 overflow-y-auto"
              rows="10"
            />

            <button
              onClick={handleNextStep}
              className="px-8 py-4 bg-green-500 text-black rounded hover:bg-green-600 transition"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-3xl p-12 bg-gray-800 rounded-lg shadow-lg mx-4">
            <h1 className="text-3xl font-bold mb-6">
              Ready to Initiate Transaction
            </h1>
            <p className="mb-4 text-gray-300">
              Ensure that the contract details are correct before proceeding.
            </p>
            <button
              onClick={handleInitiateTransaction}
              className="px-8 py-4 bg-green-500 text-black rounded hover:bg-green-600 transition"
            >
              Initiate Transaction
            </button>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
            <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg mx-4">
              <Lottie
                loop
                animationData={animationData}
                play
                style={{ width: 150, height: 150, margin: "0 auto" }}
              />
              <h1 className="text-3xl font-bold mb-6 text-center">
                Processing
              </h1>
              <div className="text-xl text-gray-300">{loadingMessage}</div>
            </div>
          </div>
        )}

        {step === 4 && !isLoading && (
          <div className="w-full max-w-[1800px] min-h-[700px] p-10 bg-gray-800 rounded-lg shadow-lg flex mx-4">
            <div className="w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4">Query the Contract</h2>
              <textarea
                placeholder="Enter your query"
                className="w-full min-h-[500px] p-3 bg-gray-700 rounded border border-gray-600 overflow-y-auto"
                rows="10"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />

              <button
                onClick={handleQuery}
                className="mt-4 px-8 py-4 bg-green-500 text-black rounded hover:bg-green-600 transition"
              >
                Run Query
              </button>
            </div>
            <div className="w-1/2 p-4 bg-gray-900 rounded-lg border border-gray-600">
              <h2 className="text-xl font-bold mb-4">Query Result</h2>
              <pre className="text-white text-left whitespace-pre-wrap break-words">
                {queryResult || "Query result will appear here."}
              </pre>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
