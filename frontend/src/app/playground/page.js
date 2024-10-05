"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserSection from "../../components/userSection";
import Lottie from "react-lottie-player";
import animationData from "../../../public/animation.json";
import axios from "axios"; // Axios is commonly used for HTTP requests
import { FaCheckCircle } from "react-icons/fa"; // Icon for progress
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWaitForTransaction,
  useWriteContract,
  useReadContract,
} from "wagmi";
import contract_ABI from "../../constants/contract_abi.js";
import toast from "react-hot-toast";
import { ethers } from "ethers";

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
  const { data: hash, writeContractAsync } = useWriteContract();
  const [transactionHash, setTransactionHash] = useState(""); // Store transaction hash
  const {
    isLoading: isConfirming,
    isError,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
    onSuccess(data) {
      setLoadingMessage("Blitz created successfully!");
      setIsLoading(false);
      toast.success("Blitz created successfully!");
    },
    onError(error) {
      setLoadingMessage(""); // Clear loading message
      setIsLoading(false);
      toast.error("Smart contract execution failed. Please try again.");
      console.error("Transaction failed", error);
    },
  });
  const { data: hasBlitz } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contract_ABI,
    chainId: 656476,
    functionName: "hasBlitz",
    args: [address],
  });

  const { data: blitz_id } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contract_ABI,
    chainId: 656476,
    functionName: "getBlitz",
    args: [address],
  });
  async function fetchBlitzDataById(id) {
    try {
      // Fetch data from the backend using the provided _id
      const response = await axios.get(
        `https://blitz-protocol-backend.vercel.app/blitz/${id}`
      );

      // The response contains the specific Blitz data for the provided _id
      const blitzData = response.data;

      return blitzData; // Return the data for further use
    } catch (error) {
      console.error("Error fetching Blitz data by ID:", error);
      return null; // Return null in case of error
    }
  }

  useEffect(() => {
    const fetchBlitzData = async () => {
      if (blitz_id) {
        try {
          const blitzData = await fetchBlitzDataById(blitz_id);
          console.log(blitzData);
          setProtocolName(blitzData.protocolName);
          setProtocolImage(blitzData.imageUrl);
          setContractAddress(blitzData.contractAddress);
        } catch (error) {
          console.error("Error fetching blitz data:", error);
        }
      }

      if (hasBlitz && blitz_id) {
        setStep(4);
        toast.success("Blitz Already Created, one per address");
      }
    };

    fetchBlitzData();
  }, [blitz_id, hasBlitz]);

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

  const steps = [
    { label: "Protocol Details" },
    { label: "Contract Details" },
    { label: "Initiate Transaction" },
    { label: "Test It Out" },
  ];

  const handleNextStep = () => {
    if (step === 1) {
      if (!protocolName || !protocolImage) {
        toast.error("Please enter the protocol details to continue.");
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (!contractAddress || !contractABI) {
        toast.error("Please enter the contract details to continue.");
      } else if (!ethers.isAddress(contractAddress)) {
        toast.error("Invalid contract address.");
      } else {
        try {
          const parsedABI = JSON.parse(contractABI);
          if (!Array.isArray(parsedABI)) {
            toast.error("Invalid ABI format. Must be an array.");
          } else {
            setStep(3);
          }
        } catch (error) {
          toast.error("Invalid ABI JSON format.");
        }
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Limit file size to 2MB
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      toast.error("File size exceeds 2MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProtocolImage(base64String); // Set the base64 string as the protocol image
    };

    if (file) {
      reader.readAsDataURL(file); // Convert the file to base64 format
    }
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
    if (!address) {
      toast.error("Please connect your wallet to continue.");
      return;
    }

    try {
      setIsLoading(true); // Start loader
      setLoadingMessage("Initializing transaction..."); // Step 1 message

      let parsedABI;
      try {
        parsedABI = JSON.parse(contractABI);
      } catch (error) {
        console.error("Error parsing contract ABI:", error);
        toast.error("Error parsing contract ABI. Please check your input.");
        setIsLoading(false); // Stop loader if there's an error
        return;
      }
      // Prepare payload for backend request
      const payload = {
        contractAddress,
        contractABI: parsedABI,
        protocolName,
        imageUrl: protocolImage,
      };

      // Making POST request to backend
      const response = await axios.post(
        `https://blitz-protocol-backend.vercel.app/register`,
        payload
      );
      // const response = await axios.post(
      //   `https://localhost:3000/register`,
      //   payload
      // );
      const entry_id = response.data._id;

      const weiValue = ethers.parseEther((0.01).toString(), "ether");

      // Initiating smart contract transaction
      const transaction = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contract_ABI,
        chainId: 656476,
        functionName: "createBlitz",
        args: [protocolName, contractAddress, entry_id],
        value: weiValue,
      });

      setLoadingMessage("Verifying Blitz details..."); // Step 2 message
      setTransactionHash(transaction.hash);

      // Parse ABI

      // Handle backend response
      if (response.status === 200) {
        console.log("Protocol registered successfully:", response.data._id);
        toast.success("Protocol registered successfully!");
        setStep(4); // Move to the next step after success
      } else {
        console.error("Failed to register protocol:", response.data);
        toast.error("Backend registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during the transaction:", error);
      if (
        error.reason === "Transaction failed" ||
        error.message.includes("revert")
      ) {
        toast.error(
          "Smart contract execution failed. Please make sure you are using different contract address every time to create a Blitz."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Always stop loader at the end of the process
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden  h-[calc(100vh-8rem)] overflow-y-auto">
      <Header />
      <div className="mt-[6rem] ">
        {" "}
        {/* Add margin to accommodate the floating header */}
        <UserSection
          user={{
            profilePic: protocolImage || "/profile.jpeg",
            name: protocolName || "Protocol Name",
            contractAddress: contractAddress || "-",
            querySlug: `https://blitz-protocol-backend.vercel.app/api/{API_KEY}/${contractAddress}`,
          }}
        />
        {/* Progress Bar */}
        <div className="flex justify-center mt-8 max-w-[70%] mx-auto">
          {steps.map((s, idx) => (
            <div
              key={idx}
              onClick={() => idx < step && setStep(idx + 1)} // Only clickable for completed steps
              className={`relative flex-1 px-4 py-2 text-center border ${
                idx < step - 1 // Completed steps
                  ? "border-orange-500 cursor-pointer"
                  : idx === step - 1 // Current step (in progress)
                  ? "border-orange-400"
                  : "border-gray-700" // Future steps
              }`}
            >
              <span
                className={idx < step - 1 ? "text-orange-500" : "text-gray-400"}
              >
                {s.label}
              </span>
              {/* Show the tick icon only for completed steps */}
              {idx < step - 1 && (
                <FaCheckCircle className="absolute right-2 top-2 text-orange-500" />
              )}
            </div>
          ))}
        </div>
        {/* Step 1: Protocol Details */}
        {step === 1 && (
          <div className="w-full max-w-3xl p-12 bg-[#202124] rounded-lg shadow-lg mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">
              Step 1: Enter Protocol Details
            </h1>
            <input
              type="text"
              placeholder="Protocol Name"
              value={protocolName}
              onChange={(e) => setProtocolName(e.target.value)}
              className="w-full p-3 mb-4 bg-[#313338] text-white rounded-lg border border-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 mb-4 bg-[#313338] text-white rounded-lg border border-[#5a5a5a]"
            />
            <button
              onClick={handleNextStep}
              className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-transform duration-300 ease-in-out"
            >
              Continue
            </button>
          </div>
        )}
        {/* Step 2: Contract Details */}
        {step === 2 && (
          <div className="w-full max-w-3xl p-12 bg-[#202124] rounded-lg shadow-lg mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">
              Step 2: Enter Contract Details
            </h1>
            <input
              type="text"
              placeholder="Contract Address"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="w-full p-3 mb-4 bg-[#313338] text-white rounded-lg border border-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder="Contract ABI"
              value={contractABI}
              onChange={(e) => setContractABI(e.target.value)}
              className="w-full p-3 mb-4 bg-[#313338] text-white rounded-lg border border-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="10"
            />
            <button
              onClick={handleNextStep}
              className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-transform duration-300 ease-in-out"
            >
              Continue
            </button>
          </div>
        )}
        {/* Step 3: Transaction Initiation */}
        {step === 3 && (
          <div className="w-full max-w-3xl p-12 bg-[#202124] rounded-lg shadow-lg mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">
              Step 3: Initiate Transaction
            </h1>
            <p className="mb-4 text-gray-300">
              Ensure the contract details are correct before proceeding.
            </p>

            {/* Blitz Creation Fee Section */}
            <div className="flex justify-between items-center bg-[#313338] p-4 rounded-lg mb-6 w-[90%]">
              <span className="text-lg font-bold text-white">
                Blitz Creation Fee:
              </span>
              <span className="text-lg font-bold text-orange-500">
                0.01 EDU
              </span>
            </div>

            {/* Additional Information */}
            <p className="text-sm text-gray-400 mb-4">
              Incase you are looking for a Testnet Faucet, check out:{" "}
              <a
                href="https://educhain-community-faucet.vercel.app/"
                className="text-orange-500 hover:text-orange-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Community Faucet
              </a>{" "}
              or{" "}
              <a
                href="https://drpc.org/faucet/open-campus-codex"
                className="text-orange-500 hover:text-orange-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                dRPC Faucet
              </a>
            </p>

            {/* Initiate Transaction Button */}
            <button
              onClick={handleInitiateTransaction}
              className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-transform duration-300 ease-in-out"
            >
              Initiate Transaction
            </button>
          </div>
        )}
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="w-full max-w-lg p-8 bg-[#202124] rounded-lg shadow-lg mx-4">
              <Lottie
                loop
                animationData={animationData}
                play
                style={{ width: 150, height: 150, margin: "0 auto" }}
              />
              <h1 className="text-3xl font-bold mb-6 text-center text-white">
                Processing
              </h1>
              <div className="text-xl text-center text-gray-300">
                {loadingMessage}
              </div>
            </div>
          </div>
        )}
        {/* Step 4: Query */}
        {step === 4 && !isLoading && (
          <div className="w-full max-w-7xl min-h-[40rem] p-12 bg-[#202124] rounded-lg shadow-lg flex mx-auto mt-10">
            <div className="w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4 text-white">
                Query the Contract
              </h2>
              <textarea
                placeholder="Enter your query"
                className="w-[33rem] h-[80%] p-3 mb-4 bg-[#313338] text-white rounded-lg border border-[#5a5a5a] focus:outline-none focus:ring-2 focus:ring-orange-400"
                rows="8"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />
              <button
                onClick={handleQuery}
                className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-transform duration-300 ease-in-out"
              >
                Run Query
              </button>
            </div>
            <div className="w-1/2 p-4 bg-[#202124] border-white border rounded-lg overflow-x-auto overflow-y-auto max-h-[30rem]">
              <h2 className="text-xl font-bold mb-4 text-white">
                Query Result
              </h2>
              <pre className="text-white whitespace-pre-wrap break-words">
                {queryResult || "Query result will appear here."}
              </pre>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
