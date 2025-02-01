import { useState } from 'react';
import { UserPlus, Search, UserX } from 'lucide-react';

interface Friend {
  id: number;
  name: string;
  walletAddress: string;
  avatar: string;
}

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: "Alex Thompson",
      walletAddress: "0x1234...5678",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      walletAddress: "0x8765...4321",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-32">
      <div className="flex justify-between items-center mb-8">
  <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
  
  <div className="flex items-center space-x-2">
    {/* Input Field */}
    <input
      type="text"
      placeholder="Enter username"
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    {/* Button */}
    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.walletAddress}</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600">
              <UserX className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;