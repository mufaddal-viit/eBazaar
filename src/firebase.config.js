import { initializeApp } from "firebase/app";

const requiredFirebaseEnvVars = [
  "VITE_APP_FIREBASE_API_KEY",
  "VITE_APP_FIREBASE_AUTH_DOMAIN",
  "VITE_APP_FIREBASE_PROJECT_ID",
  "VITE_APP_FIREBASE_STORAGE_BUCKET",
  "VITE_APP_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_APP_FIREBASE_APP_ID",
];

const missingFirebaseEnvVars = requiredFirebaseEnvVars.filter(
  (envKey) => !import.meta.env[envKey]
);

if (missingFirebaseEnvVars.length > 0) {
  throw new Error(
    `Missing Firebase environment variables: ${missingFirebaseEnvVars.join(
      ", "
    )}`
  );
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
