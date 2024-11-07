import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Vista_lateral';
import Categorias from './Components/Categorias';
import Productos from './Components/Productos';
import Ventas from './Components/Ventas';
import Ventaslista from './Components/Ventaslista';

const App = () => {
    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route path="/productos" element={<><Ventas /><Productos /></>} />
                <Route path="/categorias" element={<><Ventas /><Categorias /></>} />
                <Route path="/ventaslista" element={<Ventaslista />} />
            </Routes>
        </Router>
    );
};

export default App;
