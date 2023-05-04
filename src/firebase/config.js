// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEbeI7KOt4siG2IE_FdAFyIm_xMkhqG3s",
  authDomain: "fotospets-2d5c0.firebaseapp.com",
  projectId: "fotospets-2d5c0",
  storageBucket: "fotospets-2d5c0.appspot.com",
  messagingSenderId: "45383621595",
  appId: "1:45383621595:web:32206dff5f93f0f18725fe"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);

