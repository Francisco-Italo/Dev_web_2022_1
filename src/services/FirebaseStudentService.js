import {collection, orderBy, query, onSnapshot, doc, addDoc, getDocs, getDoc, deleteDoc, updateDoc} from "firebase/firestore"

class FirebaseStudentService{
    static unscribe = null;

    static create = (firestore, callback, student) => {
        const coll = collection(firestore, 'students')
        addDoc(coll, student)
        .then(
            (docRef)=>{
                console.log(`Estudante adicionado com sucesso! ID: ${docRef.id}`)
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error), callback(null))
    }

    static list = (firestore,callback) => {
        const coll = collection(firestore, 'students')
        getDocs(coll, orderBy('name'))
        .then(
            (querySnapshot)=>{
                let students = []
                querySnapshot.forEach(
                    (doc) => {
                        students.push(
                            {
                                _id: doc.id,
                                name: doc.data().name,
                                course: doc.data().course,
                                ira: doc.data().ira
                            }
                        )
                    }
                )
                callback(students)
            }
        )
        .catch(error => console.log(error))
    }

    static list_onSnapshot = (firestore,callback) =>{
        const coll = collection(firestore, 'students')
        const q = query(coll)
        FirebaseStudentService.unscribe = onSnapshot(
            q,
            (querySnapshot)=>{
                let students = []
                querySnapshot.forEach(
                    (doc) => {
                        students.push(
                            {
                                _id: doc.id,
                                name: doc.data().name,
                                course: doc.data().course,
                                ira: doc.data().ira
                            }
                        )
                    }
                )
                callback(students)
            }
        )
    }
    
    static retrieve = (firestore, callback, _id) => {
        const docRef = doc(firestore, 'students', _id)
        getDoc(docRef)
        .then(
            (docSnapshot) => {
                if(docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error => console.log(error))
    }

    static update = (firestore, callback, _id, student) => {
        const docRef = doc(firestore, 'students', _id)
        updateDoc(docRef, student)
        .then(
            () => {
                callback(true)
            }
        )
        .catch(error => console.log(error))
    }
 
    static delete = (firestore, callback, _id) => {
        const docRef = doc(firestore, 'students', _id)
        deleteDoc(docRef)
        .then(
            () => { callback(true) }
        )
        .catch(error => console.log(error))
    }
}

export default FirebaseStudentService;