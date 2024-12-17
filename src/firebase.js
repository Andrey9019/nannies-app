import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

// Firebase конфігурація
const firebaseConfig = {
  apiKey: "AIzaSyBfzKnwI4nZkQOQgfJNeu6EYJdPC4_NsKc",
  authDomain: "nannies-app1.firebaseapp.com",
  databaseURL:
    "https://nannies-app1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nannies-app1",
  storageBucket: "nannies-app1.appspot.com",
  messagingSenderId: "683140715253",
  appId: "1:683140715253:web:b1083dff390c0e13c32bbc",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Експорти Firebase-сервісів
export const auth = getAuth(app);
export const database = getDatabase(app);

// Функція для отримання даних про нянь
const featchNannies = async () => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "nannies"));
    if (snapshot.exists()) {
      return snapshot.val(); // Повертаємо дані, якщо вони існують
    } else {
      console.log("No data available");
      return []; // Повертаємо порожній масив, якщо даних немає
    }
  } catch (error) {
    console.error("Error fetching nannies:", error);
    return []; // Повертаємо порожній масив у разі помилки
  }
};

export default featchNannies;
