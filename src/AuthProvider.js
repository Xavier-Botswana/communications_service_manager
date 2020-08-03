import React, { useEffect, useState } from "react";
import firebase from "./firebase";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [pending, setPending] = useState(true);

  const getUserDetails = (currentUser) => {
    let docRef = firebase.db.collection("users").doc(currentUser.email);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserDetails(doc.data());
        } else {
          //console.log("No such document!");
        }
      })
      .catch((error) => {
       // console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Store user locally
        localStorage.setItem("current-user", authUser);

        setCurrentUser(authUser);
        getUserDetails(authUser);
        setPending(false)

      } else {
        setCurrentUser(null);
      }
    });
  if(pending){
    return <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
  } 
    //console.log(`STORED USER: ${localStorage.getItem("current-user")}`);
    setCurrentUser(localStorage.getItem("current-user"));
  }, []);

/** if(pending){
    return <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
  } */

  return (
    <AuthContext.Provider value={{ currentUser, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
}
