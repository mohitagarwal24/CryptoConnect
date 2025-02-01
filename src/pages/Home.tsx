import ScrollingLogos from "../components/ScrollingLogos";
import Footer from '../components/Footer';
import RegisterModal from "../components/RegisterModal";
import useMetaMask from "../hooks/UseMetamask";
import { useEffect, useState } from "react";
import { checkUserExists, saveUser } from "../hooks/useRealtimeDatabase";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const { account } = useMetaMask();

    useEffect(() => {
      if (account) {
        console.log("Checking user existence for:", account);
        checkUserExists(account).then((exists) => {
          console.log("User exists:", exists);
          setUserExists(exists);
          if (!exists) setShowModal(true);
        });
      } else {
        setUserExists(null);
        setShowModal(false);
      }
    }, [account]);
  
    const handleSaveUser = async (username: string) => {
      if (username.trim() !== "") {
        await saveUser(account as string, username);
        setShowModal(false);
        setUserExists(true);
      }
    };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 mt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CryptoConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to the decentralized social experience. Connect with friends, chat securely, and manage your digital assets all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Secure Chat</h3>
            <p className="text-gray-600">End-to-end encrypted messaging with your crypto friends</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Asset Management</h3>
            <p className="text-gray-600">Track and manage your crypto portfolio with ease</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Social Network</h3>
            <p className="text-gray-600">Connect with other crypto enthusiasts worldwide</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ScrollingLogos />
        </div>
      </div>
      <RegisterModal isOpen={showModal}  onSubmit={handleSaveUser} />
      {/* Footer now outside the wrapper */}
      <Footer />
    </>
  );
};

export default Home;
