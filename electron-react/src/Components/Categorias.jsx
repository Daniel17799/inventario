import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarCategoria from './Gestion_categoria';
import '../Style/Categorias.css'


function Categorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/categorias')
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener categorías:', error);
            });
    }, []);

    return (
        <div className='contenedor-categorias'>
        <table>
            <thead>
                <tr>
                    <th>Categorías productos</th>
                    <th>Id</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.id}</td>

                    </tr>
                ))}
            </tbody>
        </table>
        < AgregarCategoria />
        </div>
    );
}

export default Categorias;

