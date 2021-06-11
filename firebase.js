import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCc9M5LozdTXgAI0zUaS9NpjHYMoeF-geo",
  authDomain: "tailor-041.firebaseapp.com",
  projectId: "tailor-041",
  storageBucket: "tailor-041.appspot.com",
  messagingSenderId: "858451899285",
  appId: "1:858451899285:web:959563fbeba6119389bc9c",
  measurementId: "G-EEVT677N76",
};
// Initialize Firebase


export async function uploadImage(uri, imgname){
    if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        console.log('firebase apps',firebase.apps)
    }

    const responce = await fetch(uri)
    const blob = await responce.blob()

    var ref = firebase.storage().ref().child("images/"+imgname)
    ref.put(blob)
    .then(async ( responce ) => {
        // console.log('responce of image upload:',responce)
        console.log('success')
        let downloadUrl = await firebase.storage().ref("images/"+imgname).getDownloadURL();
        console.log('downloadUrl :', downloadUrl); // do whatever you need with it
    })
    .catch((err) => {
        console.log('image upload error:',err)
    })

}


// https://firebasestorage.googleapis.com/v0/b/tailor-041.appspot.com/o/images%2Ftest-name?alt=media&token=148459c8-c169-4695-86ae-0003b215c9e4