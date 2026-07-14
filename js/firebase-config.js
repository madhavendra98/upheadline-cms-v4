import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0DUG3ABj31yaMLZxE2gYTseEYOgQ4_4U",
  authDomain: "upheadlinenews-89d83.firebaseapp.com",
  databaseURL: "https://upheadlinenews-89d83-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "upheadlinenews-89d83",
  storageBucket: "upheadlinenews-89d83.firebasestorage.app",
  messagingSenderId: "366107139152",
  appId: "1:366107139152:web:e8d67c7da7c85116610555",
  measurementId: "G-PPB9CY4HVQ"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

