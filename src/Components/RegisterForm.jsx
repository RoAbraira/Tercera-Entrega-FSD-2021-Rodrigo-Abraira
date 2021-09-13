import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



    const RegisterForm = (props) => {

    const [mail, setMail] = useState ('');
    const [password, setPassword] = useState ('');

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handleRegisterFormClick = () => {

        if (mail.length === 0) {
            alert('Por favor ingrese mail')
            return; 
        }

        if (password.length === 0) {
            alert('Por favor ingrese la contraseña')
            return; 
        }
    

    fetch('http://localhost:3000/Auth/LogIn', {
            method: 'POST',
            headers: {
                "Content-Type:": "application/json"
            },
            body: JSON.stringify({ mail: mail, password:password }),
        }).then(res => {
            return res.json();
        }).then((respuesta) => {
            
            <Link to="/PaginaChat"></Link>
            
        });
    }

    return ( 
        <div>

            <p>Registrarse:</p>

            <input placeholder="Ingrese su mail" onChange={handleMailChange} />
            <input placeholder="Ingrese su contraseña" onChange={(event) => setPassword(event.target.value)} type="password"/>

            <button onCLick={handleRegisterFormClick}> Registrarse </button>

        </div>

            )
        }
export default RegisterForm;