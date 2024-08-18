import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 animate-slideIn">
        <div className="flex justify-center space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-blue-400" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-gray-500" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-600" />
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
