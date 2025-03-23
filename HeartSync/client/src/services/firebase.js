import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBjxXAEZPUvqJoEMRFXXwuEXCxcS-H3hZo",
  authDomain: "heartsync-d2c4f.firebaseapp.com",
  projectId: "heartsync-d2c4f",
  storageBucket: "heartsync-d2c4f.appspot.com",
  messagingSenderId: "1098083661340",
  appId: "1:1098083661340:web:9f89e3e99c4c7f4a8df913",
  measurementId: "G-RLXL4JLXK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configure Google Auth Provider
provider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, provider };