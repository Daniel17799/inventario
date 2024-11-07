// ventaslista.js
const express = require('express');
const { pool } = require('../connectionMySQL.js');

const router = express.Router();

// Ruta para obtener todas las ventas con detalles
router.get('/', async (req, res) => {
    try {
        const [ventas] = await pool.query(`
            SELECT v.id, v.fecha, dv.producto_id, p.nombre, dv.cantidad, p.precio
            FROM ventas v
            JOIN detalles_venta dv ON v.id = dv.venta_id
            JOIN productos p ON dv.producto_id = p.id
            ORDER BY v.fecha DESC
        `);

        // Organizar las ventas en un formato más amigable
        const ventasFormateadas = ventas.reduce((acc, curr) => {
            const ventaExistente = acc.find(venta => venta.id === curr.id);
            if (ventaExistente) {
                ventaExistente.detalles.push({
                    producto_id: curr.producto_id,
                    nombre: curr.nombre,
                    cantidad: curr.cantidad,
                    precio: curr.precio
                });
            } else {
                acc.push({
                    id: curr.id,
                    fecha: curr.fecha,
                    detalles: [{
                        producto_id: curr.producto_id,
                        nombre: curr.nombre,
                        cantidad: curr.cantidad,
                        precio: curr.precio
                    }]
                });
            }
            return acc;
        }, []);

        res.json(ventasFormateadas);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).send('Error al obtener ventas');
    }
});

module.exports = router;
