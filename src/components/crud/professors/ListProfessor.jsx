import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
//import axios from 'axios'
import ProfessorTableRow from "./ProfessorTableRow";
//import professors from "./Data";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from '../../../services/FirebaseProfessorService'
import RestrictPage from "../../../utils/RestrictPage";

const ListProfessorPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <ListProfessor firebase={firebase} />
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

const ListProfessor = (props) =>
{
    const [professors, setProfessors] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
            /*
            axios.get("http://localhost:3001/professors/list")  //express
            //axios.get("http://localhost:3001/professors")     json server
                .then(
                    (res) => {
                        setProfessors(res.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
            */
            setLoading(true)
            FirebaseProfessorService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professors) => { 
                    setLoading(false)
                    setProfessors(professors)
                }
            )
        }
        ,
        [props.firebase]
    )

    function exclude(id){
        setProfessors(professors.filter(()=> professors.id !== id));
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

        if(!professors) return
        return professors.map(
            (professor, i)=>{
                return <ProfessorTableRow 
                professor={professor} 
                key={i} 
                deleteProfessor={exclude}
                firebase={props.firebase.getFirestoreDb()} 
                />

            }
        )
    }
    
    return(
        <div>
            <h2>Listar professor</h2>
            <table className="table table-strict">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Universidade</th>
                        <th>Formação</th>
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

export default ListProfessorPage;