import React, {useState} from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

import FirebaseStudentService from "../../../services/FirebaseStudentService";

// tr = table row
// td = table data

const StudentTableRow = (props) =>
{
    const {_id, name, course, ira} = props.student   //descontrução do props
    const [loading, setLoading] = useState(false)

    function deleteData(){
        if(window.confirm(`Excluir o elemento de ID: ${_id}?`)){
            /*
            axios.delete("http://localhost:3001/students/delete/"+props.student._id)        //express
            //axios.delete("http://localhost:3001/students/"+props.student.id) json server
                  .then(res=>console.log('Registro apagado com sucesso!'),
                       deleteStudent(props.student.id))
                  .catch(error=>console.log(error))
                  */
            FirebaseStudentService.delete(
                props.firebase.getFirestoreDb(),
                () => {
                    setLoading(false)
                    props.setToast({header:'Sucesso!', body:`Registro do estudante ${_id} apagado!`})
                    props.setShowToast(true)
                },
                _id
            )
        }
    }
    
    const renderSubmitButton = () => {
        if (loading) {
            return (
                
                    <button className="btn btn-danger" type="button" disabled style={{width:'75px'}}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        
                    </button>
                
            )
        }
        return ( 
            <button className="btn btn-danger"
                    style={{width:'75px'}}
                    onClick={() => deleteData()}
            >Apagar</button>
        )
    }

    return(
        <tr>
            <td>
                {_id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {course}
            </td>
            <td>
                {ira}
            </td>
            <td style={{textAlign:'center'}}>
                <Link to={`/EditStudent/${_id}`} className="btn btn-warning" >Editar</Link>
            </td>
            <td style={{textAlign:'center'}}>
                {renderSubmitButton()}
            </td>
        </tr>
    )
}
 
export default StudentTableRow;