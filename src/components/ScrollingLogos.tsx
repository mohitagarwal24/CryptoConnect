const ScrollingLogos = () => {
  const logos = [
    { name: "Base", icon: "/assets/base.png", color: 'text-orange-500' },
    { name: "Ethereum", icon: "/assets/ethereum-eth-logo.svg", color: 'text-purple-500' },
    { name: "Polygon", icon: "/assets/polygon.webp", color: 'text-green-500' },
    { name: "Arbitrum", icon: "/assets/arbitrum.svg", color: 'text-blue-500' },
    { name: "Bitcoin", icon: "/assets/bitcoin.webp", color: 'text-blue-500' }
  ];

  // Duplicate array for smooth scrolling effect
  const doubledLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full bg-gray-100 py-16 overflow-hidden z-10">
      {/* Title Above the Scrolling Logos */}
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
        Supported Cryptos & Assets
      </h2>

      {/* Scrolling container */}
      <div className="animate-scroll flex items-center space-x-16 w-max mt-10">
        {doubledLogos.map((Logo, index) => (
          <div
            key={index}
            className="mx-6 flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-lg"
          >
            {/* Replace the icon with an <img> tag for local SVG */}
            <img src={Logo.icon} alt={Logo.name} className={`h-14 w-14 ${Logo.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingLogos;