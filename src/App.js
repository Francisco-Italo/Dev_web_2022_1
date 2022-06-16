/* eslint-disable jsx-a11y/anchor-is-valid */
//import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from './components/Home';
import About from './components/About';

import CreateStudent from "./components/crud/students/CreateStudent";
import EditStudent from "./components/crud/students/EditStudent";
import ListStudent from "./components/crud/students/ListStudent";

import CreateProfessor from "./components/crud/professors/CreateProfessor";
import ListProfessor from "./components/crud/professors/ListProfessor";
import EditProfessor from "./components/crud/professors/EditProfessor";
// import Page1 from './components/Page1';
// import Page2 from './components/Page2';

import FirebaseContext from './utils/FirebaseContext';
import FirebaseUserService from './services/FirebaseUserService';

// "/" raiz do diretório

const AppPage = () =>
<FirebaseContext.Consumer>
  {(value) => <App firebase = {value}/>}
</FirebaseContext.Consumer>

function App(props) {
  // eslint-disable-next-line no-unused-vars
  const [logged,setLogged] = useState(false)
  
  const navigate = useNavigate()

  const renderUserLogoutButton = () => {
    const loggedUsr = props.firebase.getUser()
    if (loggedUsr != null)
      return (
        <div style={{ marginRight: 20 }}>
          Olá, {loggedUsr.email}!
          <button style={{ marginLeft: 10 }} onClick={()=>logout()} >Logout</button>
        </div>
      )
    return
  }

  const logout = () => {
    if (props.firebase.getUser() != null){
      FirebaseUserService.logout(
        props.firebase.getAuthentication(),
        (res)=>{
          if(res){
            props.firebase.setUser(null)
            setLogged(false)
            navigate('/')
          }
        }
      )
    }
  }
  
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="navbar-brand" style={{ paddingLeft: 10 }}>CRUD</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="navitem">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estudante
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="navitem">
                  <Link to="/createStudent" className="nav-link">Criar Estudante</Link>
                </li>
                <li className="navitem">
                  <Link to="/listStudent" className="nav-link">Listar Estudante</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Professor
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="navitem">
                  <Link to="/createProfessor" className="nav-link">Criar Professor</Link>
                </li>
                <li className="navitem">
                  <Link to="/listProfessor" className="nav-link">Listar Professor</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {renderUserLogoutButton()}
      </nav>
      <Routes>
        <Route path="/" element={<Home setLogged={setLogged}/>} />
        <Route path="about" element={<About />} />
        <Route path="createStudent" element={<CreateStudent />} />
        <Route path="listStudent" element={<ListStudent />} />
        <Route path="editStudent/:id" element={<EditStudent />} />
        <Route path="createProfessor" element={<CreateProfessor />} />
        <Route path="listProfessor" element={<ListProfessor />} />
        <Route path="editProfessor/:id" element={<EditProfessor />} />
      </Routes>
    </div>
  );
}

export default AppPage;