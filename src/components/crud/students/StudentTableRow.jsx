import React from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

import FirebaseStudentService from "../../../services/FirebaseStudentService";

// tr = table row
// td = table data

const StudentTableRow = (props) =>
{
    const {_id, name, course, ira} = props.student   //descontrução do props

    function exclude(){
        if(window.confirm(`Excluir o elemento de ID: ${_id}?`)){
            /*
            axios.delete("http://localhost:3001/students/delete/"+props.student._id)        //express
            //axios.delete("http://localhost:3001/students/"+props.student.id) json server
                  .then(res=>console.log('Registro apagado com sucesso!'),
                       deleteStudent(props.student.id))
                  .catch(error=>console.log(error))
                  */
            FirebaseStudentService.delete(
                props.firestore,
                (ok) => {
                    if(ok) alert('Estudante ' + _id + ' apagado com sucesso!')
                },
                _id
            )
        }
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
                <button onClick={() => exclude()} className="btn btn-danger" >Apagar</button>
            </td>
            <td style={{textAlign:'center'}}>
                <Link to={`/EditStudent/${_id}`} className="btn btn-warning" >Editar</Link>
            </td>
        </tr>
    )
}
 
export default StudentTableRow;