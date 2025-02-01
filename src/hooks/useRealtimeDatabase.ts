import { database } from "../lib/firebase";
import { ref, set, get, child } from "firebase/database";

// Check if user exists
export const checkUserExists = async (walletAddress: string) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${walletAddress}`));
  return snapshot.exists();
};

// Save new user
export const saveUser = async (walletAddress: string, username: string) => {
  await set(ref(database, `users/${walletAddress}`), {
    username,
    walletAddress,
  });
};
