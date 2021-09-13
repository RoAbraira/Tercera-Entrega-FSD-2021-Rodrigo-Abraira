const jwt = require ('jsonwebtoken')

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const verifyToken = (req,res, next) => {
    const token = req.header ('auth-token')
    if (!token)
    return res.status(401).json({ error: 'Acceso denegado' })
}

try {
    const verified = jwt.verify (token, TOKEN_SECRET)
    req.user = verified
    next ();
}   catch (error) {
    res.status (400).json({error: 'El TOken no es válido'})
}

module.exports = {verifyToken
};