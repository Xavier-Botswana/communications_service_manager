import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyAV0mAIEqA8mxM2fJJJLAlrFr1k8HjTBEw",
    authDomain: "ag-nutrition-hctrhq.firebaseapp.com",
    databaseURL: "https://ag-nutrition-hctrhq.firebaseio.com",
    projectId: "ag-nutrition-hctrhq",
    storageBucket: "ag-nutrition-hctrhq.appspot.com",
    messagingSenderId: "634728987448",
    appId: "1:634728987448:web:c92a906056c2f591e19fcd",
    measurementId: "G-TMWHSQX9CZ"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

}

export default new Firebase()