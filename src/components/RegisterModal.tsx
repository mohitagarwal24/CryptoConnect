import React, { useState } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  
  onSubmit: (username: string) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen,  onSubmit }) => {
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative animate-fadeIn">
        <button
          
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Register New User</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Choose a Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;