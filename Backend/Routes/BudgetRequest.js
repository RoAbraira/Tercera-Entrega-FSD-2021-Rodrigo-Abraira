const express = require ('express');


const router = express.Router ();



router.get ('/', (req, res) => {
    res.json({ sucess: true });
});

router.post('/Chat', async (req, res) => {

    if(req.body.mail && req.body.name && req.body.password) {

        if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
            return res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
        }
const existUser = usuarios.find((u) => u.mail === req.body.mail);

if (existeUser) {
    return res.status(400).json({ success: false, message: 'Mail repetido' });

    }

const salt = await bcrypt.genSalt(10);



const password = await bcrypt.hash (req.body.password, budgetRequestMessage, salt);
const newUser = {
    name: req.body.name,
    surname: req.body.name,
    mail: req.body.mail,
    password: req.body.Contraseña,
    budgetRequestMessage: req.body.budgetRequestMessage
    
    

}

usuarios.push (newUser);

return res.json({succes:true, newUser, usuarios});

    }

    else {
        return res.status(400).json({ success: false, message: 'Faltan datos: mail, name, password'});
    }
});

router.get('/usuarios', VerifyToken, (req, res) => {

    console.log(req.user);

    res.json({ error: null, usuarios});

});

module.exports = router;

const usuarios = [
    { 
        Nombre: 'Juan', 
        Apellido: 'Perez', 
        Correo: 'juan@perez.com', 
        // buscar la constraseña encriptada en postman.
        Contraseña: '12345'
    }   

]


router.get ('/', (req, res) => {
    res.json({ sucess: true });
});

router.post('/register', async (req, res) => {

    if(req.body.chat) {

        if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
            return res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
        }
const existUser = usuarios.find((u) => u.mail === req.body.mail);

if (existeUser) {
    return res.status(400).json({ success: false, message: 'Mail repetido' });

    }

}

})
