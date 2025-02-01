import useMetaMask from "../hooks/UseMetamask";
import { Link, useLocation } from 'react-router-dom';
import { Wallet2, Blocks } from 'lucide-react';
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { account, connectWallet, disconnectWallet } = useMetaMask();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600';
  };

  return (
    <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white/50 backdrop-blur-md shadow-lg rounded-xl px-6 py-3 w-[90%] max-w-4xl">
      <div className="flex items-center justify-between">
        {/* Logo and Project Name */}
        <div className="flex items-center space-x-2">
          <Blocks className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CryptoConnect</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className={`${isActive('/')} font-medium transition-colors`}>
            Home
          </Link>
          <Link to="/chat" className={`${isActive('/chat')} font-medium transition-colors`}>
            Chat
          </Link>
          <Link to="/funds" className={`${isActive('/funds')} font-medium transition-colors`}>
            Funds
          </Link>
          <Link to="/friends" className={`${isActive('/friends')} font-medium transition-colors`}>
            Friends
          </Link>
        </div>

        {/* Connect Wallet Button */}
        <div className="relative">
      {account ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center space-x-2"
          >
            <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => { disconnectWallet(); setDropdownOpen(false); }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={connectWallet} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Connect Wallet
        </button>
      )}
    </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
