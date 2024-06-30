const db = require('../db/db');

const ObtenerTodosLosUsuarios = (req, res) => {
    try {
        const sql = 'SELECT * FROM usuarios';

        db.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result);
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
}

const ObtenerUsuarioPorId = (req, res) => {
    try {
        const { id } = req.params;//destructuring. De los parámetros que le pasen extrae el id
        const sql = 'SELECT * FROM usuarios WHERE id = ?';/*el ? es un valor que será reemplazado
        por el valor que pasemos de id por params*/
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            res.json(result);
        });

    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }

};

const crearUsuario = (req, res) => //debo agregarle try y catch
{
    try {
        const { nombre, apellido, direccion, mail, telefono } = req.body; //destructuring
        const sql = 'INSERT INTO usuarios (nombre, apellido, direccion, mail, telefono) VALUES (?, ?, ?, ?, ?)';
        //Sentencia de sql que dice insertame los valores en la tabla usuarios reemplazando los signos de pregunta

        db.query(sql, [nombre, apellido, direccion, mail, telefono], (err, result) => {
            if (err) throw err;
            //con db.query ejecuto la consulta 

            res.json({
                message: 'Usuario Creado',
                idUsuario: result.insertId
            });
        });
    } catch (error) {

        console.error(error);
        //return res.status(500).json(error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const ActualizarUsuario = (req, res) => {
    try {
        const { id } = req.params;
        //const { nombre, apellido, mail } = req.body; era la lìnea original pero me fallaba actualizar usuario
        const { nombre, apellido, direccion, mail, telefono} = req.body;

        const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ?, mail = ?, telefono = ? WHERE id = ?';
        db.query(sql, [nombre, apellido, direccion, mail, telefono, id], (err, result) => {
            if (err) throw err;


            res.json(
                {
                    message: 'Usuario editado'
                });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

const BorrarUsuario = (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM usuarios WHERE id= ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;


            res.json(
                {
                    message: 'Usuario eliminado',
                });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    ObtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    ActualizarUsuario,
    BorrarUsuario
}