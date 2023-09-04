import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
  FirebaseAppProvider,
  FirestoreProvider,
  AuthProvider,
} from 'reactfire';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import store from './app/store';
import router from './app/router';

const firebaseConfig = {
  apiKey: 'AIzaSyAHpra2RWu8ibKS9ByPM8WjP5mCe38f_Ck',
  authDomain: 'fir-exercices.firebaseapp.com',
  projectId: 'fir-exercices',
  storageBucket: 'fir-exercices.appspot.com',
  messagingSenderId: '693363998904',
  appId: '1:693363998904:web:3f62c0b6f99c183e08744d',
  measurementId: 'G-0B8B67MVS4',
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <FirestoreProvider sdk={firestore}>
        <AuthProvider sdk={auth}>
          <ReduxProvider store={store}>
            <RouterProvider router={router} />
          </ReduxProvider>
        </AuthProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
);
