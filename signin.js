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
