/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
const express = require('express');
const morgan = require('morgan')
const app = express(); 
const path = require('path');
const usuariosRouter = require('./routes/usuarios');/*cuando alguien entre a la dirección de usuarios va a 
visualizar los archivos que están en /usuarios */


app.use(express.json());// express
app.use(morgan("dev"));//morgan
app.use(express.static('public')); 
app.use('/usuarios',usuariosRouter); //cada vez que alguien llame a usuarios lo resuelve en usuarios.js
app.use(express.static(path.join(__dirname,'public')));

let puerto = 3000; //también se puede usar el 8080 y el 3001

app.listen(puerto, ()=>{
    console.log(`Servidor express ejecutándose en el ${puerto}`);
});

//COMANDOS PARA INSTALAR NODE y EXPRESS
// npm init -y
//npm install express --save

// COMANDO para instalar NODEMON: npm install -D nodemon
//COMANDO PARA ACTIVARLO: node --watch index.js                 
//COMANDO para instalar morgan: npm i morgan. Da más detalles de los errores que pudieran haber



//  CORS PENDIENTE
 

// const cors=require("cors"); en index.js 

// despues app.use(cors())antes de todo y despues de express en index.js;