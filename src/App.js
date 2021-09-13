import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import Avatar from './Components/Avatar';
import GeneralCharts from './Components/GeneralCharts';
import PaginaBudgetRequest from './Pages/PaginaBudgetRequest';
import Footer from './Components/Footer';
import './App.css'
import LogIn from './Pages/LogIn';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


/* Crear Nav y poner lista con botones */

/* Importar componentes y revisar metodo de exportación */





function App() {
   
    const [fulbotdatabases, setFulbotDataBases] = useState([]);
    const [userdata, setuserdata] = useState('');
    const [userstats, setuserstats] = useState([]);
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        fetch("http://localhost:4000/fulbotDataBase", {
            method:"GET"
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(respuestaJSON) {
            setFulbotDataBases(respuestaJSON.sensors)
        })
    }, []);

    return (
        <div>
        
        <Router>
            <Switch>   
                <Route>  
                    <Nav/>
                </Route> 
            </Switch>  
        </Router>
        <Avatar/>
        <GeneralCharts/>
        <div className="section button">
        <button className="section button">Quiero un Bot para mi proyecto</button>
        <button className="section button">Conozca a sus usuarios</button>
        <button className="section button">Soluciones Personalizadas</button>
        </div>
        <Footer/>
        
        </div>
    
  )
 }

export default App
