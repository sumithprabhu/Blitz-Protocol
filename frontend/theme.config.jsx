import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaArrowRight,
} from "react-icons/fa";

export default {
  logo: (
    <>
      <img
        src="/logo.png"
        alt="Blitz Protocol Logo"
        width={35}
        height={40}
        style={{ marginRight: "1rem" }}
      />
      <span style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
        Blitz Protocol
      </span>
    </>
  ),
  project: {
    link: "https://github.com/",
  },
  navbar: {
    backgroundColor: "#FF8B00", // Custom navbar color
  },
  sidebar: {
    toggleButton: false,
  },
  nextThemes: {
    defaultTheme: 'light'
  },
  darkMode: false,
  color: {
    hue: 30,
    saturation: 100,
  },
  footer: {
    content: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left side: Text content */}
        <span>
          © {new Date().getFullYear()}{" "}
          <a href="https://" target="_blank">
            Blitz Protocol
          </a>
          . All rights reserved.
        </span>

        {/* Right side: Social icons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="https://twitter.com/blitzprotocolHQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane size={20} />
          </a>
        </div>
      </div>
    ),
  },
};
