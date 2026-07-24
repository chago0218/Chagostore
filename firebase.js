
// Firebase 연결 설정

const firebaseConfig = {
  apiKey: "AIzaSyCcao0Ojq1BnGIBxaUhgUlJZmR6t0Ym-E0",
  authDomain: "chagostore-9a89c.firebaseapp.com",
  projectId: "chagostore-9a89c",
  storageBucket: "chagostore-9a89c.firebasestorage.app",
  messagingSenderId: "703353726861",
  appId: "1:703353726861:web:8a6ddac04a65fac7227fc4"
};


firebase.initializeApp(firebaseConfig);

window.db = firebase.firestore();
