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
