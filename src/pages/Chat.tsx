import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import TransactionHistory from '../components/TransactionHistory';
import { checkUserExists, getUser, getWalletbyUsername } from '../hooks/useRealtimeDatabase';
import useMetaMask from '../hooks/UseMetamask';
import { BigNumberish, ethers } from 'ethers';
import ABI from "../build/Bridge.json";

const chainData: { [key: number]: { router: string; link: string; destinationChainSelector: string; ccip: string } } = {
  11155111 : { // Ethereum Sepolia
      router: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59',
      link: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      destinationChainSelector: "16015286601757825753",
      ccip: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05"
  },
  80002: { // Polygon Amoy
      router: '0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2',
      link: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904',
      destinationChainSelector: "16281711391670634445",
      ccip: "0xcab0EF91Bee323d1A617c0a027eE753aFd6997E4"
  },
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MoneyTransfer {
  amount: number;
  to: string;
  platform: string;
  currency: string;
}

interface Swap {
  amount: number;
  fromCurrency: string;
  toPlatform: string;
}


const parseCommand = (input: string): MoneyTransfer | Swap | null => {
  const transferRegex = /send\s+(\d+(?:\.\d+)?)\s*(usd|dollars)\s+to\s+([a-zA-Z]+)\s+on\s+([a-zA-Z]+)/i;
  const transferMatch = input.match(transferRegex);

  if (transferMatch) {
    const amount = parseFloat(transferMatch[1]);
    const currency = transferMatch[2].toUpperCase();
    const to = transferMatch[3];
    const platform = transferMatch[4];

    return {
      amount,
      to,
      platform,
      currency
    };
  }

  const swapRegex = /swap\s+(\d+)\s*(usd|usd|dollars)\s+to\s+([a-zA-Z]+)/i;
  const swapMatch = input.match(swapRegex);

  if (swapMatch) {
    const amount = parseFloat(swapMatch[1]);
    const fromCurrency = swapMatch[2].toUpperCase();
    const toPlatform = swapMatch[3];

    return {
      amount,
      fromCurrency,
      toPlatform
    };
  }

  return null;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [txHash, setTxHash] = useState("");
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null); 

  // Check MetaMask account
  useEffect(() => {
    const checkMetaMaskAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error fetching account address:", error);
        }
      }
    };

    checkMetaMaskAccount();
  }, []);


  console.log("account:", account); 


  useEffect(() => {
    const fetchUser = async () => {
      if (account) {
        console.log("Checking user existence for:", account);
        const exists = await checkUserExists(account);
        if (exists) {
          const _user = await getUser(account);
          setUser(_user);
        } else {
          setUser(null);
        }
      }
    };

    fetchUser();
  }, [account]);

const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const transferTokens = async ( 
    destinationChainSelector: string,
    receiver: string,
    token: string,
    amount: string) => {
    if (!window.ethereum) {
      alert("MetaMask is required!");
      return;
    }

    console.log("private key before Transfer:", user?.agentPrivateKey);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const agentWallet = new ethers.Wallet(user?.agentPrivateKey, provider);
    const contract = new ethers.Contract(user?.contractAddress, ABI, agentWallet);

    try {
      const tx = await contract.transferTokensPayLINK(
        destinationChainSelector,
        receiver,
        token,
        amount
      );

      setTxHash(tx.hash);
      console.log("Transaction sent:", tx.hash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  // Prevent auto-scrolling when submitting query
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Check for money transfer or swap command
    const command = parseCommand(input);

    if (command) {
      if ((command as MoneyTransfer).to) {
        const moneyTransfer = command as MoneyTransfer;
        console.log('Detected money transfer:', moneyTransfer);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `I found a request to send ${moneyTransfer.amount} ${moneyTransfer.currency} to ${moneyTransfer.to} on ${moneyTransfer.platform}.` },
        ]);

        if (moneyTransfer.platform === "polygon"){
          const chainId = 80002;
          const receiver = await getWalletbyUsername(moneyTransfer.to);
          if (receiver) {
            transferTokens(chainData[chainId].destinationChainSelector, receiver, chainData[chainId].ccip, ethers.parseEther(moneyTransfer.amount.toString()).toString());
          } else {
            console.error("Receiver wallet address not found");
          }
        }

      } else {
        const swapCommand = command as Swap;
        console.log('Detected swap command:', swapCommand);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `I found a request to swap ${swapCommand.amount} ${swapCommand.fromCurrency} to ${swapCommand.toPlatform}.` },
        ]);
      }
      setIsLoading(false);
      return; // Don't send a request to the API if it's a command (either transfer or swap)
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: input.trim() }]
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const assistantMessage = { role: 'assistant' as const, content: data.candidates[0].content.parts[0].text };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-32">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Chat</h1>

      <div className="bg-white rounded-lg shadow-lg flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      <div className="min-h-screen bg-gray-100 p-4">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Chat;
