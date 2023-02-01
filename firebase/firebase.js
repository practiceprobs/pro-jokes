import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvcsGtWpYZdcJ5UBGKRRSzjPGgmUYEzb0",
  authDomain: "pro-jokes.firebaseapp.com",
  projectId: "pro-jokes",
  storageBucket: "pro-jokes.appspot.com",
  messagingSenderId: "1053541595629",
  appId: "1:1053541595629:web:ec2c865aa932601b9b4fe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);