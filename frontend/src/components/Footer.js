import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loader icon

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);

    // Simulate an API call delay
    setTimeout(() => {
      setEmail(""); // Reset email input after the mock call
      setLoading(false);
    }, 2000);
  };

  return (
    <footer className="bg-black text-white pt-16 pb-6 px-6">
      {" "}
      {/* Increased the height with py-16 */}
      {/* Footer container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo and Subscribe Section */}
        <div className="pr-8">
          {" "}
          {/* Added padding-right for spacing */}
          <div className="flex items-center space-x-2 mb-4">
            {" "}
            {/* Flex to align logo and text */}
            <img
              src="/logo.png" // Path to your logo image
              alt="Blitz Protocol"
              className="h-10"
            />
            <span className="text-2xl font-bold text-white ">
              Blitz Protocol
            </span>{" "}
            {/* Text next to the logo */}
          </div>
          <p className="mb-4 mt-[2rem]">Get the latest Blitz Protocol news</p>
          <div
            className="flex items-center space-x-2 border-b-2 border-gray-600 pb-2"
            style={{ maxWidth: "250px" }}
          >
            {" "}
            {/* Reduced the input size */}
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent outline-none text-sm text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="text-[#FF8B00]" onClick={handleSubmit}>
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" /> // Loader animation
              ) : (
                <FaArrowRight />
              )}
            </button>
          </div>
        </div>

        {/* Developers and Follow Us Section */}
        <div className="grid grid-cols-2 gap-8">
          {" "}
          {/* Two column grid */}
          {/* Developers Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-gray-400 hover:text-white">
                  Documentation Hub
                </a>
              </li>
            </ul>
          </div>
          {/* Social Links (with labels) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-col space-y-4">
              {" "}
              {/* Vertically stacked icons with labels */}
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <FaTwitter className="text-2xl hover:text-white" />
                <span className="text-gray-400 hover:text-white">Twitter</span>
              </div>
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <FaTelegramPlane className="text-2xl hover:text-white" />
                <span className="text-gray-400 hover:text-white">Telegram</span>
              </div>
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <FaLinkedin className="text-2xl hover:text-white" />
                <span className="text-gray-400 hover:text-white">LinkedIn</span>
              </div>
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <FaGithub className="text-2xl hover:text-white" />
                <span className="text-gray-400 hover:text-white">Github</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-[3rem] border-t border-gray-700 pt-6 flex justify-between items-center text-sm text-gray-500">
        <p>© 2024 Blitz Protocol. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white">
            Terms and conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
