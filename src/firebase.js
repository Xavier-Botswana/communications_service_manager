import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC9FmuEVhMdo-h-NKvefj0Nl3RO7APPaAQ',
  authDomain: 'gov-communications.firebaseapp.com',
  projectId: 'gov-communications',
  storageBucket: 'gov-communications.appspot.com',
  messagingSenderId: '419061628722',
  appId: '1:419061628722:web:3002d28e550f531f9be12b',
  measurementId: 'G-NFP49YJ1P6',
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  onAuthStateChange() {
    return this.auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log("The user is logged in");
      } else {
        //console.log("The user is not logged in");firebase.database.ServerValue.TIMESTAMP
      }
    })
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  addUser(email, password) {}

  logAction(email, action) {
    const currentdate = new Date()
    const datetime =
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds()
    // Firestore function to activity by user:
    this.db
      .collection('activity_log')
      .doc()
      .set({
        user: email,
        action: action,
        time: datetime,
      })
      .then(() => {
        //console.log('Document successfully written!')
      })
      .catch((error) => {
        //console.error('Error writing document: ', error)
      })
  }

  //   {
  //     "date": "24/02/02",
  //     "department": "MTC-1",
  //     "recipient": "test",
  //     "status": "Delivered",
  //     "message": "Message Sent."
  // }

  logMessageSent(department, recipient, status, message) {
    const currentdate = new Date()
    const datetime =
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds()
    // Firestore function to activity by user:
    this.db
      .collection('activity_log')
      .doc()
      .set({
        date: datetime,
        dapartment: department,
        recipient: recipient,
        status: status,
        message: message,
      })
      .then(() => {
        console.log('Delivert status logged!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  logout() {
    return this.auth.signOut()
  }

  async register(
    firstName,
    lastName,
    email,
    password,
    userType,
    phoneNumber,
    imageURL,
  ) {
    // Firebase auth to save email and password:
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Added user auth details.')
        // Update displayName
        this.auth.currentUser
          .updateProfile({
            displayName: `${firstName} ${lastName}`,
          })
          .then(() => {
            console.log('Updated user auth details.')
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
    // Firestore function to fetch log data:

    // Firestore function to save user details:
    this.db
      .collection('users')
      .doc(email)
      .set({
        name: `${firstName} ${lastName}`,
        phoneNumber: phoneNumber,
        userType: userType,
        imageURL: imageURL,
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })

    // Alert refresh to confirm action
  }
}

export default new Firebase()
