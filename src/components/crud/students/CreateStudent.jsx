import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
//import axios from 'axios'

import FirebaseContext from '../../../utils/FirebaseContext'
//import FirebaseConn from '../../../utils/FirebaseConn'
import FirebaseStudentService from "../../../services/FirebaseStudentService"
import RestrictPage from '../../../utils/RestrictPage'

// operador de coalescência: op1 ?? op2 - retorna op2 se op1 for nulo ou undefined, senão retorna op1

const CreateStudentPage = ({setShowToast, setToast}) =>
<FirebaseContext.Consumer>
    { 
        (firebase) => {
            return(
                <RestrictPage isLogged={firebase.getUser() != null}>
                    <CreateStudent firebase={firebase} setToast={setToast} setShowToast={setShowToast} />
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

    // eslint-disable-next-line no-unused-vars
    const [validate, setValidate] = useState({name:'', course:'', ira:''})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const validateFields = () => {
        let validateAccess = true
        setValidate({name:'',course:'',ira:''})

        if(name === '' || course === '' || ira === ''){
            props.setToast({header:'Erro!',body:'Preencha todos os campos.'})
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = {name:'',course:'',ira:''}
            if(name === '') validateObj.name = 'is-invalid'
            if(course === '') validateObj.course = 'is-invalid'
            if(ira === '') validateObj.ira = 'is-invalid'
            //console.log(course)
            setValidate(validateObj)
        }

        if(ira !== '' && (ira < 0 || ira > 10)){
            props.setToast({header:'Erro!',body:'O IRA deve ser um valor entre 0 e 10!'})
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = {name:'',course:'',ira:''}
            validateObj.ira = 'is-invalid'
            setValidate(validateObj)
        }

        return validateAccess
    }

    const handleSubmit = (event) => {
        event.preventDefault() 
        setLoading(true)

        if(!validateFields()) return

        const newStudent = { name, course, ira }
        /*axios.post('http://localhost:3001/students/register', newStudent)       //express
        //axios.post('http://localhost:3001/students', newStudent)                //json server
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
            () => {
                props.setToast({header:'Sucesso!', body:`Aluno ${name} criado com sucesso.`})
                props.setShowToast(true)
                
                setLoading(false)
                navigate("/listStudent")
            },
            newStudent
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
                    <input type="submit" value="Cadastrar estudante" className="btn btn-primary" />
                </div>
            </>
        )
    }

    return(
        <div>
            <h2>Criar estudante</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Nome</label>
                    <input  type="text"
                            className={`form-control ${validate.name}`}
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event)=>setName(event.target.value)}
                            />
                </div>
                <div className="form-group">
                    <label>Curso</label>
                    <input  type="text"
                            className={`form-control ${validate.course}`}
                            value={course ?? ""}
                            name="course"
                            onChange={(event)=>setCourse(event.target.value)}
                            />
                </div>
                <div className="form-group">
                    <label>IRA</label>
                    <input  type="number"
                            className={`form-control ${validate.ira}`}
                            value={ira ?? 0}
                            name="ira"
                            onChange={(event)=>setIra(event.target.value)}
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

export default CreateStudentPage;