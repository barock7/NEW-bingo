      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
      import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  
      const firebaseConfig = {
          apiKey: "AIzaSyBRW2r6gW8ah6DkbME0FzLfUv6kCzloO8U",
          authDomain: "friendsbingo-d17f7.firebaseapp.com",
          projectId: "friendsbingo-d17f7",
          storageBucket: "friendsbingo-d17f7.appspot.com",
          messagingSenderId: "1028940353502",
          appId: "1:1028940353502:web:f7cc1615e2cf21bd60174f",
          measurementId: "G-QTYPTTNWER"
      };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
            window.location.href = 'dashboard.html'; // Adjust this to your actual dashboard or home page
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
