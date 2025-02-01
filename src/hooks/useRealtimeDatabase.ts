import { database } from "../lib/firebase";
import { ref, set, get, child } from "firebase/database";

// Check if user exists
export const checkUserExists = async (agentWalletAddress: string) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${agentWalletAddress}`));
  return snapshot.exists();
};

// Save new user
export const saveUser = async (agentWalletAddress: string, username: string) => {
  await set(ref(database, `users/${agentWalletAddress}`), {
    username,
   agentWalletAddress,
  });
};
