import { useParams, Link } from "react-router-dom";
import Participante from "./pages/Participante";
import Cobrador from "./pages/Cobrador";

const RolePage = () => {
  const { type } = useParams();
  const lowerType = type?.toLowerCase();

  // Si el tipo es válido, mostrar el componente correspondiente
  if (lowerType === "participante") return <Participante />;
  if (lowerType === "cobrador") return <Cobrador />;

  // Si el tipo no es válido, mostrar opciones
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>¿Quién sos?</h2>
      <p>Seleccioná tu rol para continuar:</p>
      <div style={{ marginTop: "2rem" }}>
        <Link 
          to="/role/participante" 
          style={{
            marginRight: "1rem",
            padding: "1rem 2rem",
            background: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
          }}
        >
          Soy Participante
        </Link>
        <Link 
          to="/role/cobrador" 
          style={{
            padding: "1rem 2rem",
            background: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
          }}
        >
          Soy Cobrador
        </Link>
      </div>
    </div>
  );
};

export default RolePage;
