import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import axios from "axios";
//import professors from "./Data";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import RestrictPage from "../../../utils/RestrictPage";

const EditProfessorPage = ({setShowToast, setToast}) =>
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <EditProfessor firebase={firebase} setShowToast={setShowToast} setToast={setToast} />
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

    // eslint-disable-next-line no-unused-vars
    const [validate, setValidate] = useState({name:'', course:'', ira:''})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
 
    const params = useParams()

    const validateFields = () => {
        let validateAccess = true
        setValidate({ name: '', univ: '', degree: '' })

        if (name === '' || univ === '' || degree === '') {
            props.setToast({ header: 'Erro!', body: 'Preencha todos os campos.' })
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = { name: '', univ: '', degree: '' }
            if (name === '') validateObj.name = 'is-invalid'
            if (univ === '') validateObj.univ = 'is-invalid'
            if (degree === '') validateObj.degree = 'is-invalid'
            setValidate(validateObj)
        }

        if(!(degree === 'Graduação' || degree === 'Pós-graduação' || degree === 'Mestrado' ||
           degree === 'Doutorado' || degree === 'Pós-doutorado')){
            props.setToast({header:'Erro!',body:'Grau acadêmico não-reconhecido!'})
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = {name:'',univ:'',degree:''}
            validateObj.ira = 'is-invalid'
            setValidate(validateObj)
        }

        return validateAccess
    }

    const handleSubmit = (event) =>
    {
        event.preventDefault()
        setLoading(true)

        if(!validateFields()) return

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

    const renderSubmitButton = () => {
        if (loading) {
            return (
                <div style={{ paddingTop: 20 }}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span style={{ marginLeft: 10 }}>Carregando...</span>
                    </button>
                </div>
            )
        }
        return (
            <>
                <div className="form-group" style={{ paddingTop: 20 }}>
                    <input type="submit" value="Editar" className="btn btn-primary" />
                </div>
            </>
        )
    }

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
                        {renderSubmitButton()}
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