import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import axios from "axios";
//import professors from "./Data";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import RestrictPage from "../../../utils/RestrictPage";

const EditProfessorPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <EditProfessor firebase={firebase} />
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

const EditProfessor = (props) =>
{
    const [name, setName] = useState("")
    const [univ, setUniv] = useState("")
    const [degree, setDegree] = useState("")

    const navigate = useNavigate()

    const params = useParams()

    const handleSubmit = (event) =>
    {
        event.preventDefault()
        const updatedProfessor =
        {
           name,univ,degree
        }
        /*
        axios.put('http://localhost:3001/professors/update/' + params.id, updatedProfessor) //express
        //axios.put('http://localhost:3001/professors/' + params.id, updatedProfessor) json server
            .then(
                res => {
                    //console.log(res.data)
                    //props.history.push('/listStudent');
                    console.log(props)
                }
            )
            .catch(error => console.log(error))
        */
        FirebaseProfessorService.update(
            props.firebase.getFirestoreDb(),
           (ok) => {
               if(ok) navigate("/listProfessor")
           },
           params.id,
           updatedProfessor
        )
    }

    //https://pt-br.reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {
            /*
            axios.get('http://localhost:3001/professors/retrieve/' + params.id)              //express
            //axios.get('http://localhost:3001/professors/' + params.id) json server
                .then(
                    (res) => {
                        setName(res.data.name)
                        setUniv(res.data.univ)
                        setDegree(res.data.degree)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
            */
           FirebaseProfessorService.retrieve(
            props.firebase.getFirestoreDb(),
                (data) => {
                    setName(data.name)
                    setUniv(data.univ)
                    setDegree(data.degree)
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
                    <h2>Editar professor</h2>
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
                            <input type="submit" value="Editar Professor" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </main>
            <nav>
                <Link to="/ListProfessor"> Voltar para a listagem </Link>
            </nav>
        </>
    )
}

export default EditProfessorPage;