import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Venta.css'

const Venta = () => {
    const [productos, setProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        // Cargar los productos desde el backend
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos', error);
            }
        };
        fetchProductos();
    }, []);

    // Agregar un producto a la venta
    const handleAddProduct = () => {
        if (!selectedProduct || cantidad <= 0) return;

        const producto = productos.find(p => p.id === parseInt(selectedProduct));
        if (!producto) return;

        setProductosSeleccionados([...productosSeleccionados, { ...producto, cantidad }]);
        setCantidad(1);
        setSelectedProduct('');
    };

    // Eliminar un producto de la venta
    const handleRemoveProduct = (id) => {
        setProductosSeleccionados(productosSeleccionados.filter(producto => producto.id !== id));
    };

    // Enviar la venta
    const handleSubmitVenta = async () => {
        try {
            const response = await axios.post('http://localhost:5000/productos/ventas', {
                productos: productosSeleccionados.map(p => ({
                    producto_id: p.id,
                    cantidad: p.cantidad
                }))
            });
            alert('Venta registrada con éxito');
            setProductosSeleccionados([]); // Limpiar la venta
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            alert('Error al registrar la venta');
        }
    };

    return (
        <div className="venta-container">
            <h1>Registrar Venta</h1>

            {/* Formulario de selección de productos */}
            <div>
                <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                >
                    <option value="">Seleccione un producto</option>
                    {productos.map(producto => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre} - ${producto.precio}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    min="1"
                    placeholder="Cantidad"
                />

                <button onClick={handleAddProduct}>Agregar Producto</button>
            </div>

            {/* Listado de productos seleccionados */}
            <div>
                <h2>Productos Seleccionados</h2>
                <ul>
                    {productosSeleccionados.map(producto => (
                        <li key={producto.id}>
                            {producto.nombre} - ${producto.precio} x {producto.cantidad}
                            <button onClick={() => handleRemoveProduct(producto.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Botón para enviar la venta */}
            {productosSeleccionados.length > 0 && (
                <button onClick={handleSubmitVenta}>Registrar Venta</button>
            )}
        </div>
    );
};

export default Venta;
