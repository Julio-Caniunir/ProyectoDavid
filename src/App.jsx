import './App.css';
import ContentContainer from './ContentContainer/ContentContainer';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RolePage from "./RolePage";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<ContentContainer />} />

        {/* Ruta dinámica */}
        <Route path="/role/:type" element={<RolePage />} />

        {/* Ruta para cualquier otra (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
