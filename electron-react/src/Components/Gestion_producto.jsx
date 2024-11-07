import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Gestion_producto.css'

const GestionarProductos = () => {
    // Estados para agregar producto
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria_id, setCategoriaId] = useState('');
    const [cantidad, setCantidad] = useState(''); // Estado para cantidad

    // Estado para eliminar producto
    const [productoId, setProductoId] = useState('');

    // Estados para actualizar producto
    const [productoIdActualizar, setProductoIdActualizar] = useState('');
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [nuevoPrecio, setNuevoPrecio] = useState('');
    const [nuevaCategoriaId, setNuevaCategoriaId] = useState('');
    const [nuevaCantidad, setNuevaCantidad] = useState(''); // Estado para nueva cantidad

    const handleAgregarProducto = async (e) => {
        e.preventDefault();
        const producto = { nombre, precio, categoria_id, cantidad };

        try {
            const response = await fetch('http://localhost:5000/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Producto agregado:', data);
                // Reinicia los campos del formulario
                setNombre('');
                setPrecio('');
                setCategoriaId('');
                setCantidad('');
                window.location.reload();
            } else {
                console.error('Error al agregar producto');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const handleEliminarProducto = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/productos/${productoId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Producto con ID ${productoId} eliminado`);
                setProductoId(''); // Reiniciar el campo de ID
                window.location.reload();
            } else {
                console.error('Error al eliminar producto');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const handleActualizarProducto = async (e) => {
        e.preventDefault();
        const productoActualizado = { 
            nombre: nuevoNombre, 
            precio: nuevoPrecio, 
            categoria_id: nuevaCategoriaId, 
            cantidad: nuevaCantidad 
            
        };

        try {
            const response = await fetch(`http://localhost:5000/productos/${productoIdActualizar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoActualizado),
            });

            if (response.ok) {
                console.log(`Producto con ID ${productoIdActualizar} actualizado`);
                setProductoIdActualizar('');
                setNuevoNombre('');
                setNuevoPrecio('');
                setNuevaCategoriaId('');
                setNuevaCantidad('');
                window.location.reload();
            } else {
                console.error('Error al actualizar producto');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="contenedor-edit_productos">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleAgregarProducto}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="ID de Categoría"
                    value={categoria_id}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>

            <h2>Eliminar Producto</h2>
            <form onSubmit={handleEliminarProducto}>
                <input
                    type="number"
                    placeholder="ID del Producto"
                    value={productoId}
                    onChange={(e) => setProductoId(e.target.value)}
                    required
                />
                <button type="submit">Eliminar Producto</button>
            </form>

            <h2>Actualizar Producto</h2>
            <form onSubmit={handleActualizarProducto}>
                <input
                    type="number"
                    placeholder="ID del Producto"
                    value={productoIdActualizar}
                    onChange={(e) => setProductoIdActualizar(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nuevo Nombre"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nuevo Precio"
                    value={nuevoPrecio}
                    onChange={(e) => setNuevoPrecio(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nueva ID de Categoría"
                    value={nuevaCategoriaId}
                    onChange={(e) => setNuevaCategoriaId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nueva Cantidad"
                    value={nuevaCantidad}
                    onChange={(e) => setNuevaCantidad(e.target.value)}
                />
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default GestionarProductos;
