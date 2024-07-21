import { db } from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

async function getData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

getData();
