const express = require('express');
const cors = require ('cors');
const jwt = require ('jsonwebtoken');
const { verifyToken, TOKEN_SECRET } = require ('./Middlewares/jwt-validate')
const bcrypt = require ('bcryptjs');
const bodyParser = require ('body-parser');
const fetch = require ('fetch');
const path = require ('path');
const Auth = require ('./Routes/Auth');
const ChatResponse = require ('./Routes/ChatResponse');
const LogIn = require ('./Routes/LogIn');
const UserData = require ('./Routes/BudgetRequest');
var upload = multer({ dest: 'uploads' });
requre('dotenv').config();


const { router: fulbotDataBasesRouter } = require('./Routes/FulbotDataBasesRouter')
const { router: authRouter } = require('./Routes/Auth')

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());


//Agregar un router

app.use('/fulbotDataBasesRouter', fulbotDataBasesRouter);

app.use('/Auth', Auth);

app.use('./Middlewares/jwt-validate', jwt-validate);

app.use('/ChatResponse', ChatResponse);

