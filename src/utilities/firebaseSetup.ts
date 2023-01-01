import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const apiKey = import.meta.env.VITE_FIREBASE_API;

const firebaseConfig = {
	apiKey: apiKey,

	authDomain: "socialmedia-ac737.firebaseapp.com",

	projectId: "socialmedia-ac737",

	storageBucket: "socialmedia-ac737.appspot.com",

	messagingSenderId: "1078295792707",

	appId: "1:1078295792707:web:ced045fd0c37606b8858f6",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
