import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore, setDoc, doc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDE8FitVSdaWzMmB8ZLJSjnrpNPn7ISUK0",
  authDomain: "complaint-system-b4eab.firebaseapp.com",
  projectId: "complaint-system-b4eab",
  storageBucket: "complaint-system-b4eab.firebasestorage.app",
  messagingSenderId: "73342233656",
  appId: "1:73342233656:web:4d1d2fa1765e4c2f210acd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// SIGNUP
window.signup = async function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email: email,
      role: "user"
    });

    alert("Signup successful!");
  } catch (error) {
    alert(error.message);
  }
};

import { getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // 🔥 Get user role from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }
    } else {
      alert("User data not found");
    }

  } catch (error) {
    alert(error.message);
  }
};