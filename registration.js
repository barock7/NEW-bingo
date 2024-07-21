  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyA7h8G82IdXfh3mV2w_sA9lHPAl_dCs6iM",
  authDomain: "new-bingo-10e30.firebaseapp.com",
  databaseURL: "https://new-bingo-10e30-default-rtdb.firebaseio.com",
  projectId: "new-bingo-10e30",
  storageBucket: "new-bingo-10e30.appspot.com",
  messagingSenderId: "141077448176",
  appId: "1:141077448176:web:3adcc040f7733a3dc88935",
  measurementId: "G-PWVP6G1KSN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
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
