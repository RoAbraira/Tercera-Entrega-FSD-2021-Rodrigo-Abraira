import React, {useState, useEffect} from 'react';

function GeneralCharts() {
   
const [fulbotdatabases, setFulbotDataBases] = useState([]);
const [userstats, setuserstats] = useState([]);

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

 // const userstats = () => {
  //  if (userstats.length > 0) {
 //     fetch(`http://localhost:4000/FulbotDataBases/userstats/${userstats}`, {
 //       method: "GET"
 //     })
  //    .then(function(respuesta) {
 //       return respuesta.json();
 //     })
 //     .then(function(respuestaJSON) {
 //       if (respuestaJSON.userstats) {
 //         setuserstats(respuestaJSON.userstats)
  //      } else {
  //        setuserstats([])
 //       }
//      })
 //   } else {
     
 //     fetch(`http://localhost:4000/FulbotDataBases/userstats`, {
 //       method: "GET"
 //     })
  //    .then(function(respuesta) {
 //       return respuesta.json();
  //    })
  //    .then(function (respuestaJSON) {
  //      if (respuestaJSON.userstats) {
  //        setuserstats(respuestaJSON.userstats)
  //      } else {
  //        setuserstats([])
  //      }
//      })
//    }
//  } 

  return (
    <div className="GeneralCharts">
      <div>
        <h1>Tiempo de duración de sesiones:</h1>
        {userstats.length === 0 && <h1>No hay datos de sesion</h1>}
        {userstats.length > 0 && (
          <div>
            {userstats.map(userstats => {
              const { id, name } = userstats;
              return (
                <div key={`${id}`}>
                  <p>Id: {id}</p>
                  <p>Name: {name}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
      </div>
     )}
      


export default GeneralCharts;