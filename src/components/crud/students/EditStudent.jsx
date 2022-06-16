import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
//import axios from "axios";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from "../../../services/FirebaseStudentService";
import RestrictPage from "../../../utils/RestrictPage";
//import { students } from "./Data";
 
const EditStudentPage = () =>
    <FirebaseContext.Consumer>
        { 
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null} >
                        <EditStudent firebase={firebase}/>
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

const EditStudent = (props) =>
{
    const [name, setName] = useState("")
    const [course, setCourse] = useState("")
    const [ira, setIra] = useState(0)
    
    const navigate = useNavigate()

    const params = useParams()

    const handleSubmit = (event) =>
    {
        event.preventDefault()
        const updatedStudent =
        {
           name,course,ira
        }
        /*
        axios.put('http://localhost:3001/students/update/' + params.id, updatedStudent)         //express
        //axios.put('http://localhost:3001/students/' + params.id, updatedStudent) //json server
            .then(
                res => {
                    //console.log(res.data)
                    //props.history.push('/listStudent');
                    console.log(props)
                }
            )
            .catch(error => console.log(error))
        */
       FirebaseStudentService.update(
           props.firebase.getFirestoreDb(),
           (ok) => {
               if(ok) navigate("/listStudent")
           },
           params.id,
           updatedStudent
       )
    }

    //https://pt-br.reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {
            /*axios.get('http://localhost:3001/students/retrieve/' + params.id)                //express
            //axios.get('http://localhost:3001/students/' + params.id) //json server
                .then(
                    (res) => {
                        setName(res.data.name)
                        setCourse(res.data.course)
                        setIra(res.data.ira)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )*/
            FirebaseStudentService.retrieve(
                props.firebase.getFirestoreDb(),
                (data) => {
                    setName(data.name)
                    setCourse(data.course)
                    setIra(data.ira)
                },
                params.id
            )
        }
        ,
        [params.id, props.firebase]
    )

    return(
        <>
            <main>
                <div>
                    <h2>Editar estudante</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label>Nome</label>
                            <input  type="text"
                                    className="form-control"
                                    value={(name == null || name === undefined) ? "" : name}
                                    name="name"
                                    onChange={(event)=>setName(event.target.value)}
                                    />
                        </div>
                        <div>
                            <label>Curso</label>
                            <input  type="text"
                                    className="form-control"
                                    value={course ?? ""}
                                    name="course"
                                    onChange={(event)=>setCourse(event.target.value)}
                                    />
                        </div>
                        <div>
                            <label>IRA</label>
                            <input  type="number"
                                    className="form-control"
                                    value={ira ?? 0}
                                    name="ira"
                                    onChange={(event)=>setIra(event.target.value)}
                                    />
                        </div>
                        <div style={{paddingTop:10}} >
                            <input type="submit" value="Editar estudante" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </main>
            <nav>
                <Link to="/ListStudent"> Voltar para a listagem </Link>
            </nav>
        </>
    )
}
 
export default EditStudentPage;