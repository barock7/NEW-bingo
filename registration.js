// Import the necessary Firebase functions
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRW2r6gW8ah6DkbME0FzLfUv6kCzloO8U",
  authDomain: "friendsbingo-d17f7.firebaseapp.com",
  projectId: "friendsbingo-d17f7",
  storageBucket: "friendsbingo-d17f7.appspot.com",
  messagingSenderId: "1028940353502",
  appId: "1:1028940353502:web:f7cc1615e2cf21bd60174f",
  measurementId: "G-QTYPTTNWER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const branchName = document.getElementById('branchName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const loadingIndicator = document.getElementById('loading');

  try {
      loadingIndicator.style.display = 'block';

      const user = {
          branchName,
          email,
          password,
          activities: [{ action: 'registered', timestamp: new Date().toISOString() }]
      };

      const response = await fetch('http://localhost:3000/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              filename: `${email}.json`,
              content: JSON.stringify(user)
          })
      });

      if (response.ok) {
          alert('Branch registered successfully!');
          window.location.href = 'signin.html';
      } else {
          throw new Error('Failed to save data');
      }

  } catch (error) {
      console.error('Error:', error);
      alert('Error registering branch: ' + error.message);
  } finally {
      loadingIndicator.style.display = 'none';
  }
});
