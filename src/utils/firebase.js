// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCeQWYMEg6SECD9BOPhrc4NH4Dn6LUDOtM',
  authDomain: 'the-best-chat-apprn.firebaseapp.com',
  projectId: 'the-best-chat-apprn',
  storageBucket: 'the-best-chat-apprn.appspot.com',
  messagingSenderId: '1012265791747',
  appId: '1:1012265791747:web:1d856af718669a733f7936',
  measurementId: 'G-ERPW46YSZ2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
