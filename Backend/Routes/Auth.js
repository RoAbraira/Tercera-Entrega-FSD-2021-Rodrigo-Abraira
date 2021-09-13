const express = require ('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const usuarios = [];
const { TOKEN_SECRET } = require('../Middlewares/jwt-validate');

const { verifyTOken } = require ('./Middlewares/jwt-validate');

const router = express.Router ();

router.get ('/', (req, res) => {
    res.json({ sucess: true });
});


//register
router.post('/register', async (req, res) => {

    if(req.body.mail && req.body.name && req.body.password) {

        if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
            return res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
        }
const existUser = usuarios.find((u) => u.mail === req.body.mail);

if (existUser) {
    return res.status(400).json({ success: false, message: 'Mail repetido' });

    }

const salt = await bcrypt.genSalt(10);
const password = await bcrypt.hash (req.body.password, salt);
const newUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    mail: req.body.mail,
    password: password

}

await db.query(
    'INSERT INTO users(name, lastname, mail, password) VALUES ($1, $2, $3, $4)',
    [newUser.name, newUser.lastname, newUser.mail, newUser.password]);

return res.json({succes:true, newUser, usuarios});

    }

    else {
        return res.status(400).json({ success: false, message: 'Faltan datos: mail, name, password'});
    }
});

//login
router.post('/login', async (req, res) => {

    let usersResult = await pool.query('SELECT mail, password, FROM users WHERE mail = $1', [req.body.mail]);

    if (usersResult.rowCount === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    } 
      
    const user = usersResult.rows [0];
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Contraseña no válida' });
    
    }
    
    const token = jwt.sign({
        name: user.name,
        mail: user.mail
    }, TOKEN_SECRET);
    
    
    res.status(200).json({
        error: null,
        data: 'Login exitoso',
        token});
    
        });


router.get('/usuarios', VerifyToken, (req, res) => {

    console.log(req.user);

    res.json({ error: null, usuarios});

});

module.exports = {
    router: router 
};






