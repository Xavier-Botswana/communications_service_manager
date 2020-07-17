import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyAV0mAIEqA8mxM2fJJJLAlrFr1k8HjTBEw",
  authDomain: "ag-nutrition-hctrhq.firebaseapp.com",
  databaseURL: "https://ag-nutrition-hctrhq.firebaseio.com",
  projectId: "ag-nutrition-hctrhq",
  storageBucket: "ag-nutrition-hctrhq.appspot.com",
  messagingSenderId: "634728987448",
  appId: "1:634728987448:web:c92a906056c2f591e19fcd",
  measurementId: "G-TMWHSQX9CZ",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  addUser(email, password) {}

  logout() {
    return this.auth.signOut();
  }

  async register(
    firstName,
    lastName,
    email,
    password,
    userType,
    phoneNumber,
    imageURL
  ) {
    // Firebase auth to save email and password:
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Added user auth details.");
        // Update displayName
        this.auth.currentUser
          .updateProfile({
            displayName: `${firstName} ${lastName}`,
          })
          .then(() => {
            console.log("Updated user auth details.");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // Firestore function to save user details:
    this.db
      .collection("users")
      .doc(email)
      .set({
        name: `${firstName} ${lastName}`,
        phoneNumber: phoneNumber,
        userType: userType,
        imageURL: imageURL,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    // Alert refresh to confirm action
  }
}

export default new Firebase();
