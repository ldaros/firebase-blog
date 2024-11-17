import { firestore } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type UserData = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
};

async function addUserToFirestore(user) {
  const userRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "user",
    });
  }
}

async function getUserData(user): Promise<UserData | null> {
  if (!user) return null;

  const userDoc = await getDoc(doc(firestore, "users", user.uid));

  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data() as UserData;
}

export { addUserToFirestore, getUserData as getUserFirestore };
