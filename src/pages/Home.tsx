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
        checkUserExists(account)
          .then((exists) => {
            console.log("User exists:", exists);
            setUserExists(exists);
            if (!exists) setShowModal(true);
          })
          .catch((error) => {
            console.error("Error checking user existence:", error);
            setUserExists(false); // Handle error by assuming the user doesn't exist
          });
      } else {
        setUserExists(null);
        setShowModal(false);
      }
    }, [account]);
  
    const handleSaveUser = async (username: string) => {
      if (username.trim() !== "") {
        try {
          await saveUser(account as string, username);
          setShowModal(false);
          setUserExists(true);
        } catch (error) {
          console.error("Error saving user:", error);
          // You can handle the error state here
        }
      }
    };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 mt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CryptoConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to the decentralized social experience. Connect with friends, chat securely, and manage your digital assets all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
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

        <div className="mt-5">
          <ScrollingLogos />
        </div>

        <div className="mt-12">
  <h2 className="text-3xl font-bold text-center mb-6">See CryptoConnect in Action</h2>
  <div className="w-2/4 mx-auto">
    <video 
      className="w-full h-auto rounded-xl shadow-lg object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/assets/workflow.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>

      
      <RegisterModal isOpen={showModal} onSubmit={handleSaveUser} />
      {/* Footer now outside the wrapper */}
      <Footer />
    </div>
    </>
  );
};

export default Home;
