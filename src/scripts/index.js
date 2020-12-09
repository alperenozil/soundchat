import '../../firebase/firebaseConfiguration';
import { assignClick, initializeSigninButtons, addSongToMySongs } from './utilities';
import { googleSignin, signOut, twitterSignin } from '../../firebase/firebaseAuthentication';
import { writeSongToFirestore, readSongsFromFirestore, 
    deleteSongFromFirestore, getSongFromFirestore,
    updateSongInFirebase} from '../../firebase/firebaseRepository'
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

window.deleteSong=function(id){
    deleteSongFromFirestore(id)
    .then(()=>window.location.reload());
}

const editSongForm = document.getElementById('edit-tune-form'); 
if(editSongForm){
    const searchParams=new URLSearchParams(location.search);
    const songId=searchParams.get('id');
    getSongFromFirestore(songId)
        .then((song)=>{
            editSongForm.elements['song-id'].value=song.id;
            editSongForm.elements['artist-input-edit'].value=song.songArtist;
            editSongForm.elements['song-title-input-edit'].value=song.songTitle;
        });
    editSongForm.onsubmit=(event)=>{
        event.preventDefault();
        const id=event.target['song-id'].value;
        const songArtist=event.target['artist-input-edit'].value;
        const songTitle=event.target['song-title-input-edit'].value;
        const song={id,songArtist,songTitle};
        updateSongInFirebase(song);
    }
}