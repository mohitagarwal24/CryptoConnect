import useMetaMask from "../hooks/UseMetamask";
import { Link, useLocation } from "react-router-dom";
import { Blocks } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { account, connectWallet, disconnectWallet } = useMetaMask();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white/50 backdrop-blur-md shadow-lg rounded-xl px-6 py-3 w-[90%] max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Blocks className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CryptoConnect</span>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/chat" className="text-gray-600 hover:text-blue-600 font-medium">Chat</Link>
          
          <Link to="/friends" className="text-gray-600 hover:text-blue-600 font-medium">Friends</Link>
        </div>

        <div className="relative">
          {account ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center space-x-2"
              >
                <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg">
                  <button
                    onClick={() => { 
                      disconnectWallet(); 
                      setDropdownOpen(false);
                    }}
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
