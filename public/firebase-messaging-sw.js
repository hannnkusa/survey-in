importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBDrtaZXhKNiQAHc4dwYfE_GLiAfbd16H8",
  authDomain: "survey-in-9b942.firebaseapp.com",
  projectId: "survey-in-9b942",
  storageBucket: "survey-in-9b942.appspot.com",
  messagingSenderId: "71880651028",
  appId: "1:71880651028:web:1df9d8837136a487b31201",
  measurementId: "G-3MG3D9B8HX",
};
// eslint-disable-next-line no-undef
firebase.getApps().length === 0
  ? firebase.initializeApp(firebaseConfig)
  : firebase.getApps()[0];
// firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
