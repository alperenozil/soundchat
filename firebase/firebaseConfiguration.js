import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBJzsWzIo2L9Tjp6XhgGuQGWdPVrxgaYlM",
    authDomain: "sound-chat-3d46a.firebaseapp.com",
    projectId: "sound-chat-3d46a",
    storageBucket: "sound-chat-3d46a.appspot.com",
    messagingSenderId: "838996763405",
    appId: "1:838996763405:web:df5af6118b2cd81d7c0644"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);