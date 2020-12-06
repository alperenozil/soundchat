import firebase from 'firebase/app'
import 'firebase/auth'
export const googleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result)=>console.log('succesfully logged',result.user.displayName))
        .catch((error)=>console.log('error on sign in with google',error));
}

export const twitterSignin = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result)=>console.log('succesfully logged',result.user.displayName))
        .catch((error)=>console.log('error on sign in with twitter',error));
}

export const signOut = () => {
    firebase.auth().signOut()
        .then(()=>console.log('succesfully logged out'))
        .catch((error)=>console.log('error on sign out with google',error));
}