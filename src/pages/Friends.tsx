import { useState } from 'react';
import { UserPlus, Search, UserX } from 'lucide-react';
import { database } from "../lib/firebase";
import { ref, get, child, update, remove } from "firebase/database";

interface Friend {
  id: number;
  name: string;
  agentWalletAddress: string;
  avatar: string;
}

const currentUserWallet = "0x31539ed986f4e1d9b3ce42f50fec33565067975d"; // Replace with actual authenticated user wallet

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [walletInput, setWalletInput] = useState("");

  // Check if the wallet address exists & fetch user details
  const fetchUserDetails = async (agentWalletAddress: string) => {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, `users/${agentWalletAddress}`));
  
      if (snapshot.exists()) {
        return snapshot.val(); // Return user data (username, etc.)
      } else {
        console.log(`User not found at: users/${agentWalletAddress}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Function to fetch current user's friends
  const fetchCurrentUserFriends = async () => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${currentUserWallet}/friends`));

    if (snapshot.exists()) {
      return snapshot.val(); // Return current user's friends
    }
    return {};
  };

  // Function to add a friend
  const handleAddFriend = async () => {
    const trimmedWalletInput = walletInput.trim();
  
    if (!trimmedWalletInput) return;
  
    const friendData = await fetchUserDetails(trimmedWalletInput);
    if (!friendData) {
      alert("User not found!");
      return;
    }
  
    const newFriend = {
      name: friendData.username,
      agentWalletAddress: trimmedWalletInput,
    };
  
    // Fetch current user's friends to check if the wallet already exists
    const currentUserFriends = await fetchCurrentUserFriends();
  
    if (currentUserFriends[trimmedWalletInput]) {
      // If the friend already exists, show an alert
      alert("This user is already in your friend list!");
      return;
    }
  
    // Update Firebase: Add friend to the current user's "friends" list
    await update(ref(database, `users/${currentUserWallet}/friends/${trimmedWalletInput}`), newFriend);
  
    // Update local state to show the new friend in the UI
    setFriends([...friends, { id: Date.now(), ...newFriend, avatar: "https://via.placeholder.com/100" }]);
    setWalletInput(""); // Clear input field
  };

  // Function to remove a friend
  const handleRemoveFriend = async (friendWalletAddress: string) => {
    if (!friendWalletAddress) return;

    // Remove friend from Firebase
    await remove(ref(database, `users/${currentUserWallet}/friends/${friendWalletAddress}`));

    // Update the local state to remove the friend from the list
    setFriends(friends.filter(friend => friend.agentWalletAddress !== friendWalletAddress));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Friends</h1>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter Wallet Address"
            value={walletInput}
            onChange={(e) => setWalletInput(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddFriend}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add Friend</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
            <div className="flex items-center space-x-4">
              <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-medium text-gray-900">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.agentWalletAddress}</p>
              </div>
            </div>
            <button 
              onClick={() => handleRemoveFriend(friend.agentWalletAddress)}
              className="text-red-500 hover:text-red-600"
            >
              <UserX className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
