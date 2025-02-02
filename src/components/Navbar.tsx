import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Blocks, Moon, Sun } from "lucide-react";
import useMetaMask from "../hooks/UseMetamask";

const Navbar = () => {
  const { account, connectWallet, disconnectWallet } = useMetaMask();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [addFundsDropdown, setAddFundsDropdown] = useState(false); // State for Add Funds dropdown
  const [amount, setAmount] = useState(""); // State to track input amount

  useEffect(() => {
    console.log("Dark mode is:", darkMode); // Debugging

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Function to handle adding funds
  const handleAddFunds = () => {
    if (parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    alert(`Adding ${amount} funds...`);
    setAddFundsDropdown(false); // Close the dropdown after submitting
    setAmount(""); // Clear the input after submitting
  };

  return (
    <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 
  bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
  backdrop-blur-md shadow-lg rounded-xl px-6 py-3 w-[90%] max-w-4xl z-20">

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Blocks className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            CryptoConnect
          </span>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
            Home
          </Link>
          <Link to="/chat" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
            Chat
          </Link>
          <Link to="/friends" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
            Friends
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-800" />}
          </button>

          <div className="relative">
            {account ? (
              <div className="relative flex items-center space-x-2">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white rounded-lg flex items-center space-x-2"
                >
                  <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
                </button>

                {/* Add Funds button */}
                <button 
                  onClick={() => setAddFundsDropdown(!addFundsDropdown)} // Toggle Add Funds dropdown
                  className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700"
                >
                  Add Funds
                </button>

                {/* Add Funds Dropdown */}
                {addFundsDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-lg p-4">
                    <h3 className="text-sm font-medium mb-2">Enter Amount</h3>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Amount"
                    />
                    <button
                      onClick={handleAddFunds}
                      className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Add Funds
                    </button>
                  </div>
                )}

                {/* Dropdown menu with Disconnect button below wallet */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-lg">
                    <button
                      onClick={() => { disconnectWallet(); setDropdownOpen(false); }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={connectWallet} className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
