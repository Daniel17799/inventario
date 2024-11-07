import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarProducto from './Gestion_producto';

import '../Style/Productos.css'


const Productos =() => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/productos')
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);
            });
    }, []);

    return (
        <div className='contenedor-productos'>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Cantidad</th>

                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(producto.precio)}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                    <AgregarProducto />
        </div>
    );
}

export default Productos;
