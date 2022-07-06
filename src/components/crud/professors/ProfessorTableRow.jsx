import React from "react";
//import axios from "axios";
import { Link } from "react-router-dom";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService" 

// tr = table row 
// td = table data
 
const ProfessorTableRow = (props) =>
{
    const {_id, name, univ, degree} = props.professor   //descontrução do props

    function exclude(){
        /*
        axios.delete("http://localhost:3001/professors/delete/"+props.professor._id)        //express
        //axios.delete("http://localhost:3001/professors/"+props.professor.id) json server
              .then(res=>console.log('Registro apagado com sucesso!'),
                   deleteProfessor(props.professor.id))
              .catch(error=>console.log(error))
        */
        if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            console.log("Deu certo enfim!")
            FirebaseProfessorService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    alert('Professor ' + _id + ' apagado com sucesso!')
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
                {univ}
            </td>
            <td>
                {degree}
            </td>
            <td style={{textAlign:'center'}}>
            <button onClick={() => exclude()} className="btn btn-danger" >Apagar</button>
            </td>
            <td style={{textAlign:'center'}}>
                <Link to={`/EditProfessor/${_id}`} className="btn btn-warning" >Editar</Link>
            </td>
        </tr>
    )
}

export default ProfessorTableRow;
