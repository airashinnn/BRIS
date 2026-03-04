import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Login
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    const userData = userDoc.data();
    
    return { 
      success: true, 
      user: userCredential.user,
      role: userData?.role || "resident",
      userData: userData
    };
  } catch (error) {
    let errorMessage = "An error occurred";
    switch(error.code) {
      case 'auth/user-not-found':
        errorMessage = "User not found";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Try again later";
        break;
      default:
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
};

// Register new resident
export const registerResident = async (email, password, residentData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    
    // Save user data to Firestore
    await setDoc(doc(db, "users", userId), {
      uid: userId,
      email,
      role: "resident",
      createdAt: new Date().toISOString()
    });
    
    // Save resident data
    await setDoc(doc(db, "residents", userId), {
      ...residentData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Listen to auth changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get resident data by user ID
export const getResidentByUserId = async (userId) => {
  try {
    const residentDoc = await getDoc(doc(db, "residents", userId));
    if (residentDoc.exists()) {
      return { id: residentDoc.id, ...residentDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting resident:", error);
    return null;
  }
};