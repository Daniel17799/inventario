const express = require('express');
const { pool } = require('../connectionMySQL.js');

const router = express.Router();

//Ruta para insertar producto
router.post('/', async (req, res) => {
    const { nombre, precio, categoria_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)',
            [nombre, precio, categoria_id]
        );
        res.status(201).json({ id: result.insertId, nombre, precio, categoria_id });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).send('Error al agregar producto');
    }
});



//Ruta para obtener todas los productos
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT productos.id, productos.nombre, productos.precio, productos.cantidad, categorias.nombre AS categoria
            FROM productos
            JOIN categorias ON productos.categoria_id = categorias.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});

//Ruta para obtener productos por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('producto no encontrado'); // Manejar el caso en que no se encontró la categoría
        }
        res.json(rows[0]); // Devolver la categoría encontrada
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).send('Error al obtener producto');
    }
});


//Ruta para eliminar productos por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría a eliminar
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado'); // Manejar el caso en que no se encontró la categoría
        }
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar producto');
    }
});

//Ruta para actualizar producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria_id, cantidad } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, cantidad = ? WHERE id = ?',
            [nombre, precio, categoria_id, cantidad, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        res.status(200).send('Producto actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error al actualizar producto');
    }
})

//RUTA PARA VENTAS

router.post('/ventas', async (req, res) => {
    const { productos } = req.body;

    // Validación de entrada
    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).send('Debe proporcionar al menos un producto para la venta.');
    }

    // Iniciar la transacción
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Verificar inventario
        for (const producto of productos) {
            const [productoInventario] = await connection.query(
                'SELECT cantidad FROM productos WHERE id = ?',
                [producto.producto_id]
            );

            if (productoInventario.length === 0 || productoInventario[0].cantidad < producto.cantidad) {
                await connection.rollback();
                return res.status(400).send(`No hay suficiente inventario para el producto ID: ${producto.producto_id}`);
            }
        }

        // Crear la venta
        const [ventaResult] = await connection.query('INSERT INTO ventas (fecha) VALUES (NOW())');
        const venta_id = ventaResult.insertId;

        // Insertar los productos vendidos
        const detallesVenta = productos.map(producto => [
            venta_id, 
            producto.producto_id, 
            producto.cantidad
        ]);

        await connection.query(
            'INSERT INTO detalles_venta (venta_id, producto_id, cantidad) VALUES ?',
            [detallesVenta]
        );

        // Actualizar la cantidad de productos en inventario
        for (const producto of productos) {
            await connection.query(
                'UPDATE productos SET cantidad = cantidad - ? WHERE id = ?',
                [producto.cantidad, producto.producto_id]
            );
        }

        // Commit de la transacción
        await connection.commit();

        res.status(201).json({ mensaje: 'Venta registrada exitosamente', venta_id });
    } catch (error) {
        // Si hay un error, revertir la transacción
        await connection.rollback();
        console.error('Error al registrar la venta:', error);
        res.status(500).send('Error al registrar la venta');
    } finally {
        connection.release();
    }
});


module.exports = router;
