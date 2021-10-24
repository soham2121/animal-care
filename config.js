import firebase from 'firebase';

require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBYFkVH5uPixk5_84GbvMGSIdS85ADoSgo",
    authDomain: "animal-care-2121.firebaseapp.com",
    databaseURL: "https://animal-care-2121-default-rtdb.firebaseio.com",
    projectId: "animal-care-2121",
    storageBucket: "animal-care-2121.appspot.com",
    messagingSenderId: "651081471864",
    appId: "1:651081471864:web:aeafc76312e34e73475a8d"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();