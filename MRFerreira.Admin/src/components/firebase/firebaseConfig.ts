import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAnrOL3VFQ1_FAe-M2m6w2nd9gTM_mxNg",
  authDomain: "mrferreira-storage-5c60d.firebaseapp.com",
  projectId: "mrferreira-storage-5c60d",
  storageBucket: "mrferreira-storage-5c60d.appspot.com",
  messagingSenderId: "749000295402",
  appId: "1:749000295402:web:e642a0e2b363f4ff7de893",
};

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

export { firebaseStorage, ref, getDownloadURL };
