import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FirebaseUserService from '../services/FirebaseUserService';
import FireBaseContext from '../utils/FirebaseContext';
// eslint-disable-next-line no-unused-vars
import toastMsg from '../utils/toastMsg';

const HomePage = (props) =>
<FireBaseContext.Consumer>
    { (value) => <Home firebase={value} setLogged={props.setLogged} /> }
</FireBaseContext.Consumer>

const Home = (props) =>
{
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (event) =>
    {
        event.preventDefault()
        setLoading(true)
        FirebaseUserService.login(
            props.firebase.getAuthentication(),
            login,
            password,
            (user) => {
                if(user != null){
                    setLoading(false)
                    props.firebase.setUser(user)
                    props.setLogged(true)
                    navigate('/listStudent')
                }else{
                    setLoading(false)
                    setShowToast(true)
                }
            }
        )
    }
    
    const renderSubmitButton = () => {
        if(loading){
            return(
                <div style={{ paddingTop: 20 }}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span style={{ marginLeft: 10 }}>Carregando...</span>
                    </button>
                </div>
            )
        }
        return(
            <div className="form-group" style={{ paddingTop: 20 }}>
                    <input type="submit" value="Efetuar Login" className="btn btn-primary" />
            </div>
        )
    }

    const renderToast = () => {
        return <toastMsg
            show = {showToast}
            header = 'Erro!'
            body = 'Login e/ou senha incorreto(s).'
            setShowToast = {setShowToast}
            bg = 'primary'
        />
    }

    return(
        <div className="container-login" style={{marginTop:40}}>
            {renderToast()}
            <main style={{width:'40%'}}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Login: </label>
                        <input type="text"
                            className="form-control"
                            value={(login == null || login === undefined) ? "" : login}
                            name="login"
                            onChange={(event) => { setLogin(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Senha: </label>
                        <input type="text"
                            className="form-control"
                            value={password ?? ""}
                            name="password"
                            onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    {renderSubmitButton()}
                </form>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </div>
    )
}

export default HomePage;