import React, {useState} from "react";
//import axios from "axios";
import { Link } from "react-router-dom";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService" 

// tr = table row 
// td = table data
 
const ProfessorTableRow = (props) =>
{
    const {_id, name, univ, degree} = props.professor   //descontrução do props
    const [loading, setLoading] = useState(false)

    function deleteData(){
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
                    setLoading(false)
                    props.setToast({header:'Sucesso!', body:`Registro do professor ${_id} apagado!`})
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
                {univ}
            </td>
            <td>
                {degree}
            </td>
            <td style={{textAlign:'center'}}>
                <Link to={`/EditProfessor/${_id}`} className="btn btn-warning" >Editar</Link>
            </td>
            <td style={{textAlign:'center'}}>
                {renderSubmitButton()}
            </td>
        </tr>
    )
}

export default ProfessorTableRow;