//ENRUTADOR: Característica de Express que permite crear manejadores de rutas modulares y montables.
//Podemos reutilizar esas rutas y queda un código mas limpio. 

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


//RUTAS PARAMETRIZADAS: Obtengo el parametro id y lo uso en la función que está en userController.js
router.get('/',userController.ObtenerTodosLosUsuarios);
router.get('/:id',userController.ObtenerUsuarioPorId);
router.post('/',userController.crearUsuario);
router.put('/:id',userController.ActualizarUsuario);
router.delete('/:id',userController.BorrarUsuario);


module.exports = router;