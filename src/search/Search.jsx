import React, { useState } from 'react';
import Item from '../Item/Item';
import './search.css';
import { FaSearch } from "react-icons/fa";
import { io } from "socket.io-client";
import useSocket from '../Hooks/useSocket';


const socket = io("http://bc-api.estelarbet.net");
// 🔧 Limpia puntos y guiones del RUT
const limpiarRUT = (rut) => rut.replace(/\./g, '').replace(/-/g, '').toLowerCase();
// ✅ Permite RUT con o sin guion
const validarRUT = (rut) => {

  const rutLimpio = limpiarRUT(rut);
  const regexRUT = /^[0-9]{7,8}[0-9Kk]$/; // sin puntos, sin guion
  return regexRUT.test(rutLimpio);

};

const Search = () => {
  const { members } = useSocket(socket, 'campaign-1');
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");


  const manejarCambio = (e) => {
    setBusqueda(e.target.value);
    setError("");
  };

  const ejecutarBusqueda = () => {
    if (busqueda.trim() === "") {
      setError("El campo RUT no puede estar vacío.");
      setResultados([]);
      return;
    }

    if (!validarRUT(busqueda)) {
      setError("Ingrese un RUT válido. Ej: 12.345.678-9 o 123456789.");
      setResultados([]);
      return;
    }

    const resultadosFiltrados = members.filter(participante =>
      limpiarRUT(participante.rut) === limpiarRUT(busqueda)
    );
console.log("Resultados filtrados:", resultadosFiltrados); // Para depuración

    setResultados(resultadosFiltrados);

    if (resultadosFiltrados.length === 0) {
      setError("No se encontró ningún participante con ese RUT.");
    }

  };

  return (
    <div className="SearchContainer">
      <div className='searchHeader'>
        <FaSearch className="searchIcon" />
        <h2>verifica tu participación</h2>
        <p>Busca con tu rut y verifica tu estado para cobrar los premios</p>
      </div>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Ingresa tu RUT"
          value={busqueda}
          onChange={manejarCambio}
          className="search-input"
        />
        <FaSearch className="inputIcon" />
      </div>

      <button onClick={ejecutarBusqueda} className="search-button">Buscar</button>

      {error && <p className="error-message">{error}</p>}

      {resultados.map((participante, index) => (
        <Item
          key={index}
          clientId={participante.id}
          clientName={participante.fullName}
          clientRUT={participante.rut}
          promotionCode={participante.promotionCode}
          isRegistered={true}
          isVerified={participante.isVerified === "true"}
          didDeposit={false}
        />
      ))}
    </div>
  );
};

export default Search;
