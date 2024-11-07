import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import "../Style/Sidebar.css";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h2 className='titulo'>Administrador</h2>
      <ul className='lista-general'>
        {/* Usa Link en lugar de onClick para navegar */}
        <li className='lista-lateral'>
          <Link to="/productos">Productos</Link>
        </li>
        <li className='lista-lateral'>
          <Link to="/categorias">Categorías</Link>
        </li>
        <li className='lista-lateral'>
          <Link to="/Ventaslista">Ventas</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
