import React from 'react';
import 'rbx/index.css';
import { Button, Message } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyCiR9Lxbk9V5zwj1TeSvtvtYDDVUW9BFnA",
  authDomain: "cs394-quick-react.firebaseapp.com",
  databaseURL: "https://cs394-quick-react.firebaseio.com",
  projectId: "cs394-quick-react",
  storageBucket: "cs394-quick-react.appspot.com",
  messagingSenderId: "52427098585",
  appId: "1:52427098585:web:de1560c7ed8b7265cef1c8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

export {
  db,
  SignIn,
  Welcome
};
