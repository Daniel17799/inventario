import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Gestion_categoria.css'

const GestionarCategorias = () => {
    const [nombre, setNombre] = useState('');
    const [categoriaIdEliminar, setCategoriaIdEliminar] = useState('');
    const [categoriaIdActualizar, setCategoriaIdActualizar] = useState('');
    const [nuevoNombre, setNuevoNombre] = useState('');

    // Método para agregar categoría
    const handleAgregarCategoria = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/categorias', { nombre });
            alert(`Categoría ${response.data.nombre} agregada con éxito!`);
            setNombre('');
            window.location.reload();
        } catch (error) {
            console.error('Error al agregar la categoría:', error);
            alert('Hubo un error al agregar la categoría');
        }
    };

    // Método para eliminar categoría
    const handleEliminarCategoria = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:5000/categorias/${categoriaIdEliminar}`);
            if (response.status === 204) {
                alert(`Categoría con ID ${categoriaIdEliminar} eliminada con éxito!`);
                setCategoriaIdEliminar('');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            alert('Hubo un error al eliminar la categoría');
        }
    };

    // Método para actualizar categoría
    const handleActualizarCategoria = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/categorias/${categoriaIdActualizar}`, { nombre: nuevoNombre });
            alert(`Categoría con ID ${categoriaIdActualizar} actualizada a ${nuevoNombre}`);
            setCategoriaIdActualizar('');
            setNuevoNombre('');
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            alert('Hubo un error al actualizar la categoría');
        }
    };

    return (
        <div className='contenedor-edit_categorias'>
            <h2>Agregar Categoría</h2>
            <form onSubmit={handleAgregarCategoria}>
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <button type="submit">Agregar Categoría</button>
            </form>

            <h2>Eliminar Categoría</h2>
            <form onSubmit={handleEliminarCategoria}>
                <input
                    type="number"
                    placeholder="ID de la categoría"
                    value={categoriaIdEliminar}
                    onChange={(e) => setCategoriaIdEliminar(e.target.value)}
                    required
                />
                <button type="submit">Eliminar Categoría</button>

            </form>

            <h2>Actualizar Categoría</h2>
            <form onSubmit={handleActualizarCategoria}>
                <input
                    type="number"
                    placeholder="ID de la categoría"
                    value={categoriaIdActualizar}
                    onChange={(e) => setCategoriaIdActualizar(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nuevo nombre de la categoría"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    required
                />
                <button type="submit">Actualizar Categoría</button>
            </form>
        </div>
    );
};

export default GestionarCategorias;
