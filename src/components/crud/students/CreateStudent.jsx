import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
//import axios from 'axios'

import FirebaseContext from '../../../utils/FirebaseContext'
//import FirebaseConn from '../../../utils/FirebaseConn'
import FirebaseStudentService from "../../../services/FirebaseStudentService"
import RestrictPage from '../../../utils/RestrictPage'

// operador de coalescência: op1 ?? op2 - retorna op2 se op1 for nulo ou undefined, senão retorna op1

const CreateStudentPage = () =>
<FirebaseContext.Consumer>
    { 
        (firebase) => {
            return(
                <RestrictPage isLogged={firebase.getUser() != null}>
                    <CreateStudent firebase={firebase} />
                </RestrictPage>
            )
        } 
    }
</FirebaseContext.Consumer>

const CreateStudent = (props) =>
{
    const [name, setName] = useState("")
    const [course, setCourse] = useState("")
    const [ira, setIra] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault() 
        
        const newStudent = { name, course, ira }
        /*axios.post('http://localhost:3001/students/register', newStudent)       //express
        //axios.post('http://localhost:3001/students', newStudent) json-server
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
        console.log(course)
        console.log(ira)*/
        FirebaseStudentService.create(
            props.firebase.getFirestoreDb(),
            (_id) => {
                alert(`Aluno ${name} criado com sucesso! ID: ${_id}`)
                navigate("/listStudent")
            },
            newStudent
        )
    }

    return(
        <div>
            <h2>Criar estudante</h2>
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
                <div className="form-group">
                    <label>Curso</label>
                    <input  type="text"
                            className="form-control"
                            value={course ?? ""}
                            name="course"
                            onChange={(event)=>setCourse(event.target.value)}
                            />
                </div>
                <div className="form-group">
                    <label>IRA</label>
                    <input  type="number"
                            className="form-control"
                            value={ira ?? 0}
                            name="ira"
                            onChange={(event)=>setIra(event.target.value)}
                            />
                </div>
                <div style={{paddingTop:10}} >
                    <input type="submit" value="Criar estudante" className="btn btn-primary" />
                </div>
            </form>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </div>
    )
}

export default CreateStudentPage;