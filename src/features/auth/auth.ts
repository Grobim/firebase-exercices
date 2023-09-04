import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  updateEmail,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

export async function loginAndCreate() {
  const auth = getAuth();
  const firestore = getFirestore();

  const { user } = await signInWithPopup(auth, provider);

  const userRef = doc(firestore, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const savedUser = {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      email: user.email ?? user.providerData[0].email,
    };

    const promises = [setDoc(userRef, savedUser)];
    if (savedUser.email) {
      promises.push(updateEmail(user, savedUser.email));
    }
    await Promise.all(promises);
  }
}

export async function logout() {
  await signOut(getAuth());
}
