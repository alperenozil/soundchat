import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import {firestoreDb} from './firebaseConfiguration';
export const writeSongToFirestore = (songArtist, songTitle) => {
    const song={
        songArtist,
        songTitle
    };

    firebase.auth().onAuthStateChanged((user)=>{
        if(user) {
            const songsCollection = firestoreDb.collection(`users/${user.uid}/songs`);
            songsCollection.add(song)
            .then((docRef)=>console.log('Song document id: ',docRef.id))
            .catch((error)=>console.log('There was an error while writing a song',error)); 
        }
    });
}