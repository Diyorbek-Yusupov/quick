import firebaseApp from "@/lib/firebase";

export function useAuth() {
  const googleSignIn = async () => {
    const { signInWithPopup, GoogleAuthProvider, getAuth } = await import(
      "firebase/auth"
    );
    const auth = getAuth(firebaseApp);
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const appleSignIn = async () => {
    const { signInWithPopup, OAuthProvider, getAuth } = await import(
      "firebase/auth"
    );
    const auth = getAuth(firebaseApp);
    const appleAuthProvider = new OAuthProvider("apple.com");
    appleAuthProvider.addScope("email");
    appleAuthProvider.addScope("name");
    return signInWithPopup(auth, appleAuthProvider);
  };

  const facebookSignIn = async () => {
    const { FacebookAuthProvider, signInWithPopup, getAuth } = await import(
      "firebase/auth"
    );
    const auth = getAuth(firebaseApp);
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  };

  return { googleSignIn, appleSignIn, facebookSignIn };
}
