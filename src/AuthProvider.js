import React, { useEffect, useState } from "react";
import firebase from "./firebase";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = (currentUser) => {
    let docRef = firebase.db.collection("users").doc(currentUser.email);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserDetails(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    return userDetails;
  };

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentUser(authUser);
        setUserDetails(getUserDetails(currentUser));
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userDetails, getUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
}
