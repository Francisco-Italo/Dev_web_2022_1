import {collection, orderBy, query, onSnapshot, doc, addDoc, getDocs, getDoc, deleteDoc, updateDoc} from "firebase/firestore"

class FirebaseProfessorService{
    static create = (firestore, callback, professor) => {
        const coll = collection(firestore, 'professors')
        addDoc(coll, professor)
        .then(
            (docRef)=>{
                console.log(`Professor adicionado com sucesso! ID: ${docRef.id}`)
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static list = (firestore,callback) => {
        const coll = collection(firestore, 'professors')
        getDocs(coll, orderBy('name'))
        .then(
            (querySnapshot)=>{
                let professors = []
                querySnapshot.forEach(
                    (doc) => {
                        professors.push(
                            {
                                _id: doc.id,
                                name: doc.data().name,
                                course: doc.data().course,
                                ira: doc.data().ira
                            }
                        )
                    }
                )
                callback(professors)
            }
        )
        .catch(error => console.log(error))
    }

    static list_onSnapshot = (firestore,callback) =>{
        const coll = collection(firestore, 'professors')
        const q = query(coll)
        onSnapshot(
            q,
            (querySnapshot)=>{
                let professors = []
                querySnapshot.forEach(
                    (doc) => {
                        professors.push(
                            {
                                _id: doc.id,
                                name: doc.data().name,
                                univ: doc.data().univ,
                                degree: doc.data().degree
                            }
                        )
                    }
                )
                callback(professors)
            }
        )
    }
    
    static retrieve = (firestore, callback, _id) => {
        const docRef = doc(firestore, 'professors', _id)
        getDoc(docRef)
        .then(
            (docSnapshot) => {
                if(docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error => console.log(error))
    }

    static update = (firestore, callback, _id, professor) => {
        const docRef = doc(firestore, 'professors', _id)
        updateDoc(docRef, professor)
        .then(
            () => {
                callback(true)
            }
        )
        .catch(error => console.log(error))
    }
 
    static delete = (firestore, callback, _id) => {
        const docRef = doc(firestore, 'professors', _id)
        deleteDoc(docRef)
        .then(
            console.log("Deu certo enfim!")
            //() => { callback(_id) }
        )
        .catch(error => console.log(error))
    }
}

export default FirebaseProfessorService;