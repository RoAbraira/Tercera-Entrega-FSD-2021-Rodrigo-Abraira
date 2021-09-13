const express = require('express');
const { pool } = require('../db/index')
const path = require ('path')
const cors = require ('cors');
const db = require('../db');

const router = express.Router();

// Listar usuarios
router.get('/', async (request, response) => {
  try {
    let userdataResult = await pool.query('SELECT id, name FROM userdata WHERE deleted = false', []);
    if (userdataResult.rowCount > 0) {
      return response.send({
        message: 'Users read correctly',
        name: userdataResult.rows
      });
    } else {
      return response.send({
        message: 'No users in DB',
        name: []
      });
    }
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Listar bases de datos de futbol filtradas **
router.get('/', async (request, response) => {
  try {
    let userdataResult = await pool.query('SELECT id, name FROM userdata WHERE deleted = false', []);
    if (userdataResult.rowCount > 0) {
      return response.send({
        message: 'Users read correctly',
        name: userdataResult.rows
      });
    } else {
      return response.send({
        message: 'No users in DB',
        name: []
      });
    }
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Agregar un usuario
router.post('/', async (request, response) => {
  try {
    if (!request.body.name) {
      return response.send({ error: 'No name provided' })
    }
    
    const name = request.body.name;
  
    let userdataByNameResult = await pool.query('SELECT * FROM userData WHERE name = $1 AND deleted = false', [name]);
    if (userdataByNameResult.rowCount > 0) {
      return response.send({ error: 'Name dulpicated' });
    }
  
    await pool.query('INSERT INTO userdata (name) VALUES ($1)',[name]
    );
  
    userdataByNameResult = await pool.query('SELECT * FROM userdata WHERE name = $1 AND deleted = false', [name]);
    if (userdataByNameResult.rowCount === 1) {
      return response.send({ 
        newuserdata: userdataByNameResult.rows[0]
      });
    }

    response.send({
      message: 'User not found after insert'
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Agregar tiempo de sesion de usuario **

// using static methods
//var start = Date.now();
// the event you'd like to time goes here:
//doSomethingForALongTime();
//var end = Date.now();
//var elapsed = end - start; // time in milliseconds
//Since Date has a constructor that accepts milliseconds as an argument, you can re-convert this to a Date by just doing

//var difference = new Date(elapsed);
//If you really want the hours/minutes, 
//Date has functions for that too:
//var diff_hours = difference.getHours();
//var diff_mins = difference.getMinutes();
router.post('/', async (request, response) => {
  try {
    if (!request.body.name) {
      return response.send({ error: 'No name provided' })
    }
    
    const name = request.body.name;
  
    let userdataByNameResult = await pool.query('SELECT * FROM userdata WHERE name = $1 AND deleted = false', [name]);
    if (userdataByNameResult.rowCount > 0) {
      return response.send({ error: 'Name dulpicated' });
    }
  
    await pool.query('INSERT INTO userdata (name) VALUES ($1)',[name]
    );
  
    userdataByNameResult = await pool.query('SELECT * FROM userdata WHERE name = $1 AND deleted = false', [name]);
    if (userdataByNameResult.rowCount === 1) {
      return response.send({ 
        newuser: userByNameResult.rows[0]
      });
    }

    response.send({
      message: 'User not found after insert'
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Listar duración de sesión de usuario**
router.get('/', async (request, response) => {
  try {
    let userstatsResult = await pool.query('SELECT id, name FROM userstats WHERE deleted = false', []);
    if (userstatsResult.rowCount > 0) {
      return response.send({
        message: 'Users read correctly',
        name: userstatsResult.rows
      });
    } else {
      return response.send({
        message: 'No users in DB',
        name: []
      });
    }
  } catch(ex) {
    return response.send({ error: ex })
  }
});



// Borrar un usuario
router.delete('/:userdataId', async (request, response) => {

  try {
    if (!request.params.userId) {
      return response.send({ error: 'No id provided' })
    }
    
    const idToDelete = request.params.userId;

    let userdataDeletedResult = await pool.query('SELECT * FROM userdata WHERE id = $1 AND deleted = false', [idToDelete]);
    if (userdataDeletedResult.rowCount === 0) {
      return response.send({ 
        message: 'No user found with that id',
      });
    }
  
    await pool.query('UPDATE userdata SET deleted = true WHERE id = $1', [idToDelete]);

    userdataDeletedResult = await pool.query('SELECT * FROM userdata WHERE id = $1 AND deleted = true', [idToDelete]);
    if (sensorDeletedResult.rowCount === 1) {
      return response.send({ 
        message: 'User deleted correctly',
      });
    }
    
    return response.send({
      message: 'User not deleted after update'
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Actualizar un sensor
router.put('/:sensorId', async (request, response) => {
  try {
    if (!request.params.sensorId) {
      return response.send({ error: 'No id provided' })
    }

    if (!request.body.name) {
      return response.send({ error: 'No name provided' })
    }
    
    const name = request.body.name;
    const idToUpdate = request.params.sensorId;

    let sensorUpdateResult = await db.query('SELECT * FROM sensors WHERE id = $1 AND deleted = false', [idToUpdate]);
    if (sensorUpdateResult.rowCount === 0) {
      return response.send({ 
        message: 'No sensor found with that id',
      });
    }
  
    await db.query('UPDATE sensors SET name = $1 WHERE id = $2', [name, idToUpdate]);

    sensorUpdateResult = await db.query('SELECT * FROM sensors WHERE id = $1 AND deleted = false', [idToUpdate]);
    if (sensorUpdateResult.rowCount === 1) {
      return response.send({ 
        message: 'Sensor updated correctly',
        sensor: sensorUpdateResult.rows[0]
      });
    }
    
    return response.send({
      message: 'Sensor not updated after update'
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Listar duración de sesión de usuario**
router.get('/measurements/:sensorId/', async (request, response) => {
  try {
    if (!request.params.sensorId) {
      return response.send({ error: 'No sensor id provided' })
    }
   
    const sensorId = request.params.sensorId;
  
    const sensorByIdResult = await db.query('SELECT * FROM sensors WHERE id = $1 AND deleted = false', [sensorId]);
    if (sensorByIdResult.rowCount === 0) {
      return response.send({ 
        message: 'No sensor found with that id',
      });
    }
  
    const measurementsResult = await db.query(`
      SELECT m.*, s.name
      FROM measurements m
        INNER JOIN sensors s ON s.id = m.sensor_id
      WHERE m.sensor_id = $1 
      ORDER BY m.date
    `, [sensorId]);
    if (measurementsResult.rowCount > 0) {
      return response.send({
        message: 'Measurement read correctly',
        measurements: measurementsResult.rows
      });
    }

    return response.send({
      message: 'No measurements for that sensor',
      measurements: []
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

router.get('/measurements/', async (request, response) => {
  try {
   
    const measurementsResult = await db.query(`
      SELECT m.*, s.name
      FROM measurements m
        INNER JOIN sensors s ON s.id = m.sensor_id      
      ORDER BY m.date
    `, []);

    if (measurementsResult.rowCount > 0) {
      return response.send({
        message: 'Measurement read correctly',
        measurements: measurementsResult.rows
      });
    }

    return response.send({
      message: 'No measurements found',
      measurements: []
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Listar duración de sesión de usuario**
router.post('/userstats/', async (request, response) => {
  try {
    if (!request.params.userstatsId) {
      return response.send({ error: 'No stats provided' })
    }

    if (!request.body.sessionsingin) {
      return response.send({ error: 'No sing in session register provided' })
    }
    if (!request.body.sessionsingout) {
      return response.send({ error: 'No sing out session register provided' })
    }
   
    const userstatsId = request.params.userstatsId;
    const sessionsingin = request.body.sessionsingin;
    const sessionsingout = request.body.sessionsingout;
    
  
    const userstatsByIdResult = await db.query('SELECT * FROM userstats WHERE id = $1 AND deleted = false', [userstatsId]);
    if (userstatsByIdResult.rowCount === 0) {
      return response.send({ 
        message: 'No user register found with that id',
      });
    }
  
    await pool.query(
      'INSERT INTO userstats(sessionsingin, sessionsingout, sessionduration) VALUES ($1, $2, $3)',
      [sessionsingin, sessionsingout]
    );
  
    const userstatsResult = await pool.query('SELECT * FROM userstats WHERE sensor_id = $1', [sensorId]);
    if (userstatsResult.rowCount > 0) {
      return response.send({
        message: 'Session time added correctly',
        userstatsResult: userstatsResult.rows
      });
    }

    response.send({
      message: 'Session time not added after insert'
    });
  } catch(ex) {
    return response.send({ error: ex })
  }
});

module.exports = {
  router: router
}
