import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
//import axios from 'axios'

import StudentTableRow from "./StudentTableRow";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from '../../../services/FirebaseStudentService'
import RestrictPage from "../../../utils/RestrictPage";

//Consumidores em potencial, ou seja, aqueles que têm dados para buscar no banco serão chamados
const ListStudentPage = () => 
    <FirebaseContext.Consumer>
        { 
            (firebase) => { 
                return(
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <ListStudent firebase={firebase}/>
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

const ListStudent = (props) =>
{
    const [students, setStudents] = useState([])
    
    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
            /*
            axios.get("http://localhost:3001/students/list")        //express
            //axios.get("http://localhost:3001/students") json server
            .then(
                (res) => {
                    setStudents(res.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )*/
            setLoading(true)
            FirebaseStudentService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (students) => { 
                    setLoading(false)
                    setStudents(students)
                }
            )
        }
        ,
        [props.firebase]
    )
 
    function exclude(id){
        setStudents(students.filter(()=> students.id !== id));
        console.log("Exclusão realizada");
    }
    
    function generateTable(){
        if(loading){
            return(
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:100
                }}>
                    <div className="spinner-border"
                    style={{width:'3rem', height:'3rem'}}
                    role='status' />
                    Carregando...
                </div>
            )
        }

        if(!students) return
        return students.map(
            (student, i)=>{
                return <StudentTableRow 
                student={student} 
                key={i} 
                deleteStudent={exclude}
                firebase={props.firebase.getFirestoreDb()} 
                />

            }
        )
    }
    
    return(
        <div>
            <h2>Listar Estudante</h2>
            <table className="table table-strict">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>IRA</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody>
                    {generateTable()}
                </tbody>
            </table>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </div>
    )
}
 
export default ListStudentPage;
