// server.js
const express = require('express');
const cors = require('cors');
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const ventasListaRoutes = require('./routes/ventaslista');  // Aquí importamos el archivo de ventaslista

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta básica para probar el servidor
app.get('/', (req, res) => {
    res.send('Servidor backend funcionando');
});

// Rutas para categorías, productos y ventas
app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes); // Esta ruta maneja las ventas también
app.use('/ventas', ventasListaRoutes); // Aquí la ruta para obtener las ventas

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
