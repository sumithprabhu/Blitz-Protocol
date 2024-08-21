"use client"
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Playground() {
  const [step, setStep] = useState(3);
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState([]);
  const [queryResult, setQueryResult] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsLoading(true);
      // Simulate loading with messages
      setLoadingMessages([
        'Initializing transaction...',
        'Connecting to blockchain...',
        'Verifying contract...',
        'Fetching data...',
      ]);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 60000); // Simulate 60-second loading
    }
  };

  const handleQuery = () => {
    // Simulate a query result
    setQueryResult('Query result will be displayed here.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header buttonText="Connect Wallet" />
      <main className="flex-grow flex flex-col justify-center items-center text-center p-4">
        {step === 1 && (
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
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
              onChange={(e) => setContractABI(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600"
              rows="5"
            />
            <button
              onClick={handleNextStep}
              className="px-6 py-3 bg-neon-green text-black rounded hover:bg-green-500 transition"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Ready to Initiate Transaction</h1>
            <p className="mb-4 text-gray-300">Ensure that the contract details are correct before proceeding.</p>
            <button
              onClick={handleNextStep}
              className="px-6 py-3 bg-neon-green text-black rounded hover:bg-green-500 transition"
            >
              Initiate Transaction
            </button>
          </div>
        )}

        {isLoading && (
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Processing...</h1>
            <div className="space-y-2">
              {loadingMessages.map((message, index) => (
                <p key={index} className="text-gray-300">{message}</p>
              ))}
            </div>
          </div>
        )}

        {step === 3 && !isLoading && (
          <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg flex">
            <div className="w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4">Query the Contract</h2>
              <textarea
                placeholder="Enter your query"
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                rows="5"
              />
              <button
                onClick={handleQuery}
                className="mt-4 px-6 py-3 bg-neon-green text-black rounded hover:bg-green-500 transition"
              >
                Run Query
              </button>
            </div>
            <div className="w-1/2 p-4 bg-gray-900 rounded-lg border border-gray-600">
              <h2 className="text-xl font-bold mb-4">Query Result</h2>
              <div className="p-3 bg-gray-700 rounded">
                {queryResult || 'Query result will appear here.'}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
