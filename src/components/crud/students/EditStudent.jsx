import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
//import axios from "axios";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from "../../../services/FirebaseStudentService";
import RestrictPage from "../../../utils/RestrictPage";
//import { students } from "./Data";
 
const EditStudentPage = ({setShowToast, setToast}) =>
    <FirebaseContext.Consumer>
        { 
            (firebase) => {
                return(
                    <RestrictPage isLogged={firebase.getUser() != null} >
                        <EditStudent firebase={firebase} setShowToast={setShowToast} setToast={setToast} />
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

    // eslint-disable-next-line no-unused-vars
    const [validate, setValidate] = useState({name:'', course:'', ira:''})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const params = useParams()

    const validateFields = () => {
        let validateAccess = true
        setValidate({ name: '', course: '', ira: '' })

        if (name === '' || course === '' || ira === '') {
            props.setToast({ header: 'Erro!', body: 'Preencha todos os campos.' })
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = { name: '', course: '', ira: '' }
            if (name === '') validateObj.name = 'is-invalid'
            if (course === '') validateObj.course = 'is-invalid'
            if (ira === '') validateObj.ira = 'is-invalid'
            setValidate(validateObj)
        }

        if (ira !== '' && (ira < 0 || ira > 10)) {
            props.setToast({ header: 'Erro!', body: 'O IRA deve ser um valor entre 0 e 10!' })
            props.setShowToast(true)
            setLoading(false)
            validateAccess = false
            let validateObj = { name: '', course: '', ira: '' }
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
                        {renderSubmitButton()}
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