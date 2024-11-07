import React, { useEffect, useState } from 'react';
import '../Style/Ventas_lista.css';

const Ventaslista = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener las ventas desde el servidor
    const fetchVentas = async () => {
        try {
            const response = await fetch('http://localhost:5000/ventas');
            const data = await response.json();
            setVentas(data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    return (
        <div className="ventas-lista-container">
            <h2 className="ventas-lista-title">Ventas Realizadas</h2>
            {loading ? (
                <p className="ventas-lista-loading">Cargando ventas...</p>
            ) : (
                <table className="ventas-lista-table">
                    <thead className="ventas-lista-thead">
                        <tr>
                            <th className="ventas-lista-th">ID Venta</th>
                            <th className="ventas-lista-th">Fecha</th>
                            <th className="ventas-lista-th">Productos</th>
                            <th className="ventas-lista-th">Cantidad</th>
                            <th className="ventas-lista-th">Precio</th>
                            <th className="ventas-lista-th">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) =>
                            // Solo mostrar el ID y la fecha en la primera fila
                            venta.detalles.map((detalle, index) => (
                                <tr key={index} className="ventas-lista-tr">
                                    {index === 0 ? (
                                        <>
                                            {/* Mostrar ID y Fecha solo en la primera fila */}
                                            <td className="ventas-lista-td" rowSpan={venta.detalles.length}>{venta.id}</td>
                                            <td className="ventas-lista-td" rowSpan={venta.detalles.length}>
                                            <td className="ventas-lista-td"></td>
                                            <td className="ventas-lista-td"></td>
                                                {new Date(venta.fecha).toLocaleString()}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            {/* Dejar las celdas vacías en las filas siguientes para ID y Fecha */}
                                            
                                        </>
                                    )}
                                    <td className="ventas-lista-td">{detalle.nombre}</td>
                                    <td className="ventas-lista-td">{detalle.cantidad}</td>
                                    <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(detalle.precio)}</td>
                                    <td className="ventas-lista-td">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(detalle.cantidad * detalle.precio)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Ventaslista;
