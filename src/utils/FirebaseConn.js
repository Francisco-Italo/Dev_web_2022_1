import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

import {firebaseConfig} from '../keys/firebase_key';

export default class FirebaseConn{
    //Inicializa o firebase
    constructor(){ this.app = initializeApp(firebaseConfig); this.user = null }
    //Retorna o banco de dados firestore
    getFirestoreDb(){ return getFirestore(this.app); }
    //Auteticação do Firebase
    getAuthentication(){ return getAuth(this.app) }

    setUser(user){ this.user = user }
    getUser(user){ return this.user }
}