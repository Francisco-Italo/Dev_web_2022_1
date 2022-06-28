import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";

import FirebaseContext from '../../../utils/FirebaseContext'
//import FirebaseConn from '../../../utils/FirebaseConn'
import FirebaseProfessorService from "../../../services/FirebaseProfessorService"
import RestrictPage from '../../../utils/RestrictPage'

// operador de coalescência: op1 ?? op2 - retorna op2 se op1 for nulo ou undefined, senão retorna op1

const CreateProfessorPage = ({setShowToast, setToast}) => 
    <FirebaseContext.Consumer>
        {
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null}>
                        <CreateProfessor firebase={firebase} setShowToast={setShowToast} setToast={setToast} />
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

    // eslint-disable-next-line no-unused-vars
    const [validate, setValidate] = useState({name:'', course:'', ira:''})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const validateFields = () => {
        let validateAccess = true
        setValidate({name:'',univ:'',degree:''})

        if(name === '' || univ === '' || degree === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            
            validateAccess = false
            
            let validateObj = {name:'',univ:'',degree:''}
            if(name === '') validateObj.name = 'is-invalid'
            if(univ === '') validateObj.univ = 'is-invalid'
            if(degree === '') validateObj.degree = 'is-invalid'
            setValidate(validateObj)
        }
  
        if(!(degree === 'Graduação' || degree === 'Pós-graduação' || degree === 'Mestrado' ||
           degree === 'Doutorado' || degree === 'Pós-doutorado')){
            props.setToast({header:'Erro!',body:'Grau acadêmico não-reconhecido!'})
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = {name:'',univ:'',degree:''}
            validateObj.degree = 'is-invalid'
            setValidate(validateObj)
        }

        return validateAccess
    }

    const handleSubmit = (event) =>
    {
        event.preventDefault()
        setLoading(true)

        if(!validateFields()) return

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
            () => {
                props.setToast({header:'Sucesso!', body:`Professor ${name} adicionado com sucesso.`})
                props.setShowToast(true)
                
                setLoading(false)
                navigate("/listProfessor")
            },
            newProfessor
        )
    }

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
                    <input type="submit" value="Cadastrar professor" className="btn btn-primary" />
                </div>
            </>
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
                {renderSubmitButton()}
            </form>
            <nav>
            <Link to="/">Home</Link>
            </nav>
        </div>
    )
}

export default CreateProfessorPage;