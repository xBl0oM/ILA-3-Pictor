import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpjH5wdR5MfBWQWiQlBupOQK6dom_Zc1M",
  authDomain: "pictor-72df1.firebaseapp.com",
  projectId: "pictor-72df1",
  storageBucket: "pictor-72df1.appspot.com",
  messagingSenderId: "297917385434",
  appId: "1:297917385434:web:9b7fdbbab4f8043b9433e3",
  measurementId: "G-DYP89QY55X"
};

const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (not in development)
export const initAnalytics = async () => {
  try {
    if (await isSupported()) {
      return getAnalytics(app);
    }
  } catch (error) {
    console.warn('Firebase Analytics not supported:', error);
  }
  return null;
};

export const auth = getAuth(app);
export const storage = getStorage(app);