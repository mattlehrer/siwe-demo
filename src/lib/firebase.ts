// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBcaYHjnc6yvm_AOQvb84iZTZv50BKDkWg',
	authDomain: 'siwe-demo-mau.firebaseapp.com',
	databaseURL: 'https://siwe-demo-mau-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'siwe-demo-mau',
	storageBucket: 'siwe-demo-mau.appspot.com',
	messagingSenderId: '471949763676',
	appId: '1:471949763676:web:40c3d686817ddf116a7299'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
