import { database } from "../lib/firebase";
import { ref, set, get, child, update } from "firebase/database";

// Check if user exists
export const checkUserExists = async (agentWalletAddress: string) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${agentWalletAddress}`));
  return snapshot.exists();
};

// Save new user
export const saveUser = async (
  walletAddress: string, 
  username: string, 
  agentWalletAddress: string, 
  agentPrivateKey: string, 
  contractAddress: string // New parameter for contract address
) => {
  const userRef = ref(database, `users/${walletAddress}`);
  
  await update(userRef, {
    username,
    agentWalletAddress,
    agentPrivateKey,
    contractAddress // Update the contract address
  });
};

// Get user details
export const getUser = async (walletAddress: string) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${walletAddress}`));

  if (snapshot.exists()) {
    return snapshot.val(); // Returns user object
  } else {
    return null; // User not found
  }
};
