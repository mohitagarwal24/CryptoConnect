import React from 'react';
import { Bitcoin, Feather as Ethereum, DollarSign, Wallet, Coins, Gem, Banknote, CircleDollarSign } from 'lucide-react';

const ScrollingLogos = () => {
  const logos = [
    { name: "Bitcoin", icon: Bitcoin, color: 'text-orange-500' },
    { name: "Ethereum", icon: Ethereum, color: 'text-purple-500' },
    { name: "Dollar", icon: DollarSign, color: 'text-green-500' },
    { name: "Wallet", icon: Wallet, color: 'text-blue-500' },
    { name: "Coins", icon: Coins, color: 'text-yellow-500' },
    { name: "Gem", icon: Gem, color: 'text-pink-500' },
    { name: "Banknote", icon: Banknote, color: 'text-indigo-500' },
    { name: "Stablecoin", icon: CircleDollarSign, color: 'text-teal-500' },
  ];

  // Double the array to create a seamless loop
  const doubledLogos = [...logos, ...logos];

  return (
    <div className="relative w-full bg-gray-50 py-16 overflow-hidden">
      {/* Title Above the Scrolling Logos */}
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
        Supported Cryptos & Assets
      </h2>

      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 z-10 h-full w-[200px] bg-gradient-to-r from-gray-50 to-transparent"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-[200px] bg-gradient-to-l from-gray-50 to-transparent"></div>

      {/* Scrolling container */}
      <div className="animate-scroll flex items-center space-x-16 w-max">
        {doubledLogos.map((Logo, index) => (
          <div
            key={index}
            className="mx-6 flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-lg"
          >
            <Logo.icon className={`h-14 w-14 ${Logo.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingLogos;
