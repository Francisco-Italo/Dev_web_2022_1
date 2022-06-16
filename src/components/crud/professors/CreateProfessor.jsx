import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";

import FirebaseContext from '../../../utils/FirebaseContext'
//import FirebaseConn from '../../../utils/FirebaseConn'
import FirebaseProfessorService from "../../../services/FirebaseProfessorService"
import RestrictPage from '../../../utils/RestrictPage'


// operador de coalescência: op1 ?? op2 - retorna op2 se op1 for nulo ou undefined, senão retorna op1

const CreateProfessorPage = () => 
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <CreateProfessor firebase={firebase} />
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

const CreateProfessor = (props) =>
{
    const [name, setName] = useState("")
    const [univ, setUniv] = useState("")
    const [degree, setDegree] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event) =>
    {
        event.preventDefault()

        const newProfessor = { name, univ, degree }
        /*
        axios.post('http://localhost:3001/professors/register', newStudent)
        //axios.post('http://localhost:3001/professors', newStudent)
            .then(
                (res) => {
                    console.log(res.data.id)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )


        console.log(name)
        console.log(univ)
        console.log(degree)
        */
        FirebaseProfessorService.create(
            props.firebase.getFirestoreDb(),
            (_id) => {
                alert(`Professor ${name} criado com sucesso! ID: ${_id}`)
                navigate("/listProfessor")
            },
            newProfessor
        )
    }

    return(
        <div>
            <h2>Criar professor</h2>
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
                    <label>Universidade</label>
                    <input  type="text"
                            className="form-control"
                            value={univ ?? ""}
                            name="university"
                            onChange={(event)=>setUniv(event.target.value)}
                            />
                </div>
                <div>
                    <label>Formação</label>
                    <input  type="text"
                            className="form-control"
                            value={degree ?? ""}
                            name="degree"
                            onChange={(event)=>setDegree(event.target.value)}
                            />
                </div>
                <div style={{paddingTop:10}} >
                    <input type="submit" value="Criar Professor" className="btn btn-primary" />
                </div>
            </form>
            <nav>
            <Link to="/">Home</Link>
            </nav>
        </div>
    )
}

export default CreateProfessorPage;