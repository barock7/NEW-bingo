     // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjR42IvRlRf00oarmzCSq5y34R9IF8QG4",
  authDomain: "newbingo-bcdec.firebaseapp.com",
  databaseURL: "https://newbingo-bcdec-default-rtdb.firebaseio.com",
  projectId: "newbingo-bcdec",
  storageBucket: "newbingo-bcdec.appspot.com",
  messagingSenderId: "702994235307",
  appId: "1:702994235307:web:b89986e3004c8e481c1cee",
  measurementId: "G-0XW2JQLP97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.getElementById('signInForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loadingIndicator = document.getElementById('loading');

    try {
        loadingIndicator.style.display = 'block';

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const activity = {
            action: 'signed in',
            timestamp: new Date().toISOString()
        };

        const response = await fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filename: `${email}.json`,
                content: JSON.stringify({ email, activities: [activity] })
            })
        });

        if (response.ok) {
            alert('Sign-in successful!');
            window.location.href = 'index.html'; // Adjust this to your actual dashboard or home page
        } else {
            throw new Error('Failed to log sign-in activity');
        }

    } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in: ' + error.message);
    } finally {
        loadingIndicator.style.display = 'none';
    }
});
