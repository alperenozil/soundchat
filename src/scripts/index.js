import '../../firebase/firebaseConfiguration';
import { assignClick, initializeSigninButtons, addSongToMySongs } from './utilities';
import { googleSignin, signOut, twitterSignin } from '../../firebase/firebaseAuthentication';
import { writeSongToFirestore, readSongsFromFirestore} from '../../firebase/firebaseRepository'
initializeSigninButtons();
assignClick('signin-google', googleSignin);
assignClick('appbar-signout-button',signOut);
assignClick('signin-twitter',twitterSignin); 
const createTuneForm = document.getElementById('add-tune-form');
if (createTuneForm) {
    createTuneForm.onsubmit = (event) => {
        event.preventDefault();
        const songArtist = event.target['artist-input'].value;
        const songTitle=event.target['song-title-input'].value;
        writeSongToFirestore(songArtist,songTitle);
    }
}
// if we are in mysongs.html this will run. we are on this page
const mySongsComponent = document.getElementById('my-songs-component');
if(mySongsComponent){
    readSongsFromFirestore()
        .then((songs)=>{
            songs.forEach((song)=>{
                addSongToMySongs(mySongsComponent,song);
            });
        });
}