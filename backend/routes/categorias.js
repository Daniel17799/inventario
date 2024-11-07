const express = require('express');
const { pool } = require('../connectionMySQL.js');

const router = express.Router();


// Ruta para insertar una nueva categoría
router.post('/', async (req, res) => {
    const { nombre } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
        res.status(201).json({ id: result.insertId, nombre });
    } catch (error) {
        console.error('Error al agregar categoría:', error);
        res.status(500).send('Error al agregar categoría');
    }
});


// Ruta para obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).send('Error al obtener categorías');
    }
});



// Ruta para obtener una categoría por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría
    try {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Categoría no encontrada'); // Manejar el caso en que no se encontró la categoría
        }
        res.json(rows[0]); // Devolver la categoría encontrada
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).send('Error al obtener categoría');
    }
});

// Ruta para eliminar una categoría por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría a eliminar
    try {
        const [result] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Categoría no encontrada'); // Manejar el caso en que no se encontró la categoría
        }
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).send('Error al eliminar categoría');
    }
});

//Ruta para actualizar una categoria
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    
    try {
        const [result] = await pool.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Categoría no encontrada');
        }
        res.status(200).json({ id, nombre });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).send('Error al actualizar categoría');
    }
});

module.exports = router;