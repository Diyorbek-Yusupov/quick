import { useRouter } from "next/navigation";
import firebaseApp from "@/lib/firebase";
import useUserStore from "@/global-store/user";
import {deleteCookie} from "cookies-next";

export function useAuth() {
  const router = useRouter();
  const localSignOut = useUserStore((state) => state.signOut);
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

  const logout = async () => {
    const { signOut, getAuth } = await import("firebase/auth");
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    localSignOut();
    deleteCookie("token");
    router.replace("/");
  };

  return { googleSignIn, appleSignIn, facebookSignIn, logout };
}
