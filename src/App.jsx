import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import RolePage from "./RolePage";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige / hacia /role */}
        <Route path="/" element={<Navigate to="/role" />} />

        {/* Ruta con tipo (participante o cobrador) */}
        <Route path="/role/:type" element={<RolePage />} />

        {/* Ruta sin tipo: muestra las opciones */}
        <Route path="/role" element={<RolePage />} />

        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
