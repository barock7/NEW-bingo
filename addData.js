import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

async function addData() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: "Ada Lovelace",
            age: 30,
            city: "London"
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

addData();
